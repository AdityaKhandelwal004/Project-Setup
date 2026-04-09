const { Client } = require("pg");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const cred = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
};

console.log("cred", cred);

const loadJsonData = (filename) => {
  const filePath = path.resolve(__dirname, filename);
  console.log(`Loading data from ${filePath}...`);
  try {
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    console.error(`Error loading file ${filePath}:`, error);
    throw error;
  }
};

// Utility to insert or skip duplicates (using ON CONFLICT DO NOTHING)
const insertData = async (client, table, columns, data, conflictColumn) => {
  if (data.length === 0) {
    console.log(`No data to insert for table ${table}.`);
    return {};
  }

  const placeholders = data
    .map(
      (_, i) =>
        `(${columns.map((_, j) => `$${i * columns.length + j + 1}`).join(", ")})`
    )
    .join(", ");

  const query = `
    INSERT INTO ${table} (${columns.join(", ")})
    VALUES ${placeholders}
    ON CONFLICT (${conflictColumn}) DO NOTHING
    RETURNING id, ${conflictColumn};
  `;

  const values = data.flatMap((d) => columns.map((col) => d[col] ?? null));

  const res = await client.query(query, values);

  // Build code → id mapping
  const result = res.rows.reduce((acc, row) => {
    acc[row[conflictColumn]] = row.id;
    return acc;
  }, {});

  // Fetch IDs for forms that already existed
  const existingCodes = data.map((d) => d[conflictColumn]);
  if (existingCodes.length > 0) {
    const existingRes = await client.query(
      `SELECT id, ${conflictColumn} FROM ${table} WHERE ${conflictColumn} = ANY($1)`,
      [existingCodes]
    );
    existingRes.rows.forEach((row) => {
      result[row[conflictColumn]] = row.id;
    });
  }

  console.log(`Upserted ${Object.keys(result).length} records into ${table}.`);
  return result;
};

// Insert questions for a specific step
const insertStepQuestions = async (client, stepId, questions) => {
  if (!questions?.length) return;

  console.log(
    `Inserting questions for step ID: ${stepId} into system_form_questions`
  );

  const questionColumns = [
    "system_form_step_id",
    "code",
    "question_sequence_number",
    "presentation_meta_data",
    "configuration_meta_data",
    "status",
    "created_on",
    "created_by",
    "updated_on",
    "updated_by",
  ];

  const questionData = questions.map((question) => ({
    system_form_step_id: stepId,
    code: question.code,
    question_sequence_number: question.questionSequenceNumber,
    presentation_meta_data: JSON.stringify(question.presentationMetaData || {}),
    configuration_meta_data: JSON.stringify(
      question.configurationMetaData || {}
    ),
    status: question.status || "ACTIVE",
    created_on: question.created_on || new Date(),
    created_by: question.created_by || 1,
    updated_on: question.updated_on || new Date(),
    updated_by: question.updated_by || 1,
  }));

  await insertData(
    client,
    "system_form_questions",
    questionColumns,
    questionData,
    "code"
  );
};

// Insert steps for a specific form
const insertFormSteps = async (client, formId, formSteps) => {
  if (!formSteps?.length) return;

  console.log(`Inserting steps for form ID: ${formId}`);

  const stepColumns = [
    "system_form_id",
    "name",
    "code",
    "step_sequence_number",
    "presentation_meta_data",
    "configuration_meta_data",
    "status",
    "created_on",
    "created_by",
    "updated_on",
    "updated_by",
  ];

  const stepData = formSteps.map((step) => ({
    system_form_id: formId,
    name: step.name,
    code: step.code,
    step_sequence_number: step.stepSequenceNumber,
    presentation_meta_data: JSON.stringify(step.presentationMetaData || {}),
    configuration_meta_data: JSON.stringify(step.configurationMetaData || {}),
    status: step.status || "ACTIVE",
    created_on: step.created_on || new Date(),
    created_by: step.created_by || 1,
    updated_on: step.updated_on || new Date(),
    updated_by: step.updated_by || 1,
  }));

  const stepMap = await insertData(
    client,
    "system_form_steps",
    stepColumns,
    stepData,
    "code"
  );

  for (const step of formSteps) {
    const stepId = stepMap[step.code];
    if (stepId) {
      await insertStepQuestions(client, stepId, step.questions);
    }
  }
};

// Insert form in forms table
const insertForms = async (client, formData) => {
  if (!formData?.length) return;

  console.log("Inserting forms...");

  const formColumns = [
    "name",
    "code",
    "status",
    "meta_data",
    "created_on",
    "created_by",
    "updated_on",
    "updated_by",
  ];

  const forms = formData.map((form) => ({
    name: form.name,
    code: form.code,
    status: form.status || "ACTIVE",
    meta_data: JSON.stringify(form.metadata || {}),
    created_on: form.created_on || new Date(),
    created_by: form.created_by || 1,
    updated_on: form.updated_on || new Date(),
    updated_by: form.updated_by || 1,
  }));

  const formMap = await insertData(client, "system_forms", formColumns, forms, "code");

  for (const form of formData) {
    const formId = formMap[form.code];
    if (formId) {
      await insertFormSteps(client, formId, form.steps);
    }
  }
};

// Main process
const processData = async (client) => {
  try {
    console.log("Starting database transaction...");
    await client.query("BEGIN");

    let data = loadJsonData("forms.json");
    let investmentFormData = loadJsonData("investmentForms.json");
    data = data.concat(investmentFormData);

    await insertForms(client, data);

    await client.query("COMMIT");
    console.log("Transaction committed. Data insertion completed successfully!");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error occurred. Rolling back transaction.", err);
  } finally {
    await client.end();
    console.log("Database connection closed.");
  }
};

// Main entry point
const main = async () => {
  console.log("Connecting to the database...");
  const client = new Client(cred);
  await client.connect();
  console.log("Database connected.");
  await processData(client);
};

main().catch(console.error);
