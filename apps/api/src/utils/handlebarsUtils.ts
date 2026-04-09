import Handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';

const RESOURCES_DIR = path.resolve('src/resources');

// Track if partials are already registered to avoid re-registration
let partialsRegistered = false;

// Register email template partials
const registerEmailPartials = async (): Promise<void> => {
  if (partialsRegistered) return;

  try {
    const templatesDir = path.join(RESOURCES_DIR, 'templates/email');
    
    // Register header partial
    const headerPath = path.join(templatesDir, 'header.hbs');
    if (fs.existsSync(headerPath)) {
      const headerSource = fs.readFileSync(headerPath, 'utf8');
      Handlebars.registerPartial('header', headerSource);
    }
    
    // Register footer partial
    const footerPath = path.join(templatesDir, 'footer.hbs');
    if (fs.existsSync(footerPath)) {
      const footerSource = fs.readFileSync(footerPath, 'utf8');
      Handlebars.registerPartial('footer', footerSource);
    }
    
    partialsRegistered = true;
  } catch (error) {
    console.error('Error registering email partials:', error);
  }
};

export const parseHbsTemplate = async (source: string, data: Record<string, any>): Promise<string> => {
  // Ensure partials are registered before compiling template
  await registerEmailPartials();
  
  const template = Handlebars.compile(source);
  return template(data);
};

export const getResourcesFileSource = (relativePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(RESOURCES_DIR, relativePath), 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

// Export function to manually register partials if needed
export const initializeEmailPartials = registerEmailPartials;
