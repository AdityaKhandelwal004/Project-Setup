import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Actions } from '@mono/redux-global';
import { getDefaultMetaData, getDefaultOptionMetaData } from '@mono/models';
import type { MetaData } from '@mono/models';
import { Sagas } from '@mono/redux-global';
import { HttpMethods } from '@mono/utils';

interface OptionsHook<T> {
  options: T[];
  refreshOptions: () => void;
  searchOptions: (value?: any, key?: string) => void;
  setOptions: React.Dispatch<React.SetStateAction<T[]>>
}

/* eslint-disable import/prefer-default-export */
export const useOptions = <T,>(
  endpoint: string,
  searchable?: boolean,
  defaultFilter?: MetaData<T>
): OptionsHook<T> => {
  const reduxDispatch = useDispatch();
  const [options, setOptions] = useState<T[]>([]);

  const [refresh, setRefresh] = useState(false);
  const finalDefautFilter = defaultFilter ?? getDefaultOptionMetaData();
  const [filter, setFilter] = useState<MetaData<T>>(finalDefautFilter);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    // Prevent duplicate API calls in React StrictMode
    if (hasFetchedRef.current && !refresh) return;
    hasFetchedRef.current = true;

    let finalEndpoint = `${endpoint}`;
    if (searchable) {
      finalEndpoint = `${endpoint}?${Sagas.getPaginationParameters(filter)}`;
    }
    reduxDispatch(Actions.apiCall(
      finalEndpoint,
      (res) => {
        let options = res;
        if (searchable) {
          options = res?.records;
        }
        setOptions(options || []);
      },
      (err) => { console.log(err); },
      HttpMethods.GET
    ));
  }, [refresh]);

  const refreshOptions = () => {
    setFilter(finalDefautFilter);
    hasFetchedRef.current = false;
    setRefresh((prevRefresh) => !prevRefresh);
  };

  const updateFilters = (partialFilter: Partial<MetaData<T>>): void => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      ...partialFilter,
      page: finalDefautFilter.page,
      allowedFilters: [
        ...prevFilter.allowedFilters,
        ...(partialFilter?.allowedFilters ?? []),
      ],
      filters: {
        ...prevFilter.filters,
        ...(partialFilter?.filters ?? {}),
      },
    }));
  };

  const searchOptions = (value?: any, key: string = 'search') => {
    updateFilters({
      filters: {
        [key]: value,
      },
    });
    hasFetchedRef.current = false;
    setRefresh((prevRefresh) => !prevRefresh);
  };

  return { options, refreshOptions, searchOptions, setOptions };
};
