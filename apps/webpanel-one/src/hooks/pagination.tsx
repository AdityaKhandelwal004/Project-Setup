import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  MetaData, PagedEntity, PaginatedEntity, getDefaultMetaData,
} from '../models';
import { getPaginationParameters } from '../redux/sagas';
import { paginatedApiCall } from '../redux/actions';
interface PaginationData<T> {
  entity: PagedEntity<T>;
  filter: MetaData<T>;
  updateFilters(filter: Partial<MetaData<T>>): void;
  applyFilters(loadMore?: boolean): void;
  resetFilters(): void;
  loadMore(): void;
  fetchPage(page?: number): void;
  updateLimit(limit?: number): void;
  connectFilter: (name: string, extraProps?: Record<any, any>) => (Filter: any) => any;
  getParamsUrl(): string;
}
export const usePagination = <T, >(
  paginatedEntity: PaginatedEntity,
  defaultFilter?: MetaData<T>,
): (PaginationData<T>) => {
  const reduxDispatch = useDispatch();
  const entity: PagedEntity<T> = useSelector((state: any) => state?.[paginatedEntity.key]) ?? {
    metadata: {
      total: 0, page: 0, limit: 0, filters: {}, allowedFilters: [],
    },
    records: [],
  };
  const {
    total = 0, page = 0, limit = 0, allowedFilters = [],
  } = entity?.metadata || {};
  const finalDefautFilter = defaultFilter ?? getDefaultMetaData();
  const [filter, setFilter] = useState<MetaData<T>>(finalDefautFilter);
  const [refreshEntity, setRefreshEntity] = useState({
    refresh: false,
    loadMore: false,
  });
  useEffect(() => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      total,
      page,
      limit,
      allowedFilters: [...allowedFilters],
    }));
  }, [total, page, limit, allowedFilters]);
  useEffect(() => {
    reduxDispatch(paginatedApiCall(
      paginatedEntity.name,
      paginatedEntity.api,
      { ...filter },
      refreshEntity.loadMore,
    ));
  }, [refreshEntity.refresh]);
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
  const applyFilters = (loadMore = false) => {
    setRefreshEntity((prevRefresh) => ({
      ...prevRefresh,
      loadMore,
      refresh: !prevRefresh.refresh,
    }));
  };
  const resetFilters = () => {
    setFilter(finalDefautFilter);
    applyFilters();
  };
  const loadMore = () => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      page: (prevFilter.page + 1),
    }));
    applyFilters(true);
  };
  const fetchPage = (page?: number) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      page: (page || 1),
    }));
    applyFilters();
  };
  const updateLimit = (limit?: number) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      limit: (limit || defaultFilter?.limit),
      page: 1,
    }));
    applyFilters();
  };
  const connectFilter = (
    name: string,
    {
      autoApplyFilters, formatValue, formatFilterValue, ...extraProps
    }: Record<any, any> = {},
  ) => (Filter: any) => (
    <Filter
      {...extraProps}
      key={name}
      value={formatValue ? formatValue(filter?.filters?.[name]) : filter?.filters?.[name]}
      onChange={(value: any) => {
        updateFilters({
          filters: { [name]: formatFilterValue ? formatFilterValue(value) : value },
        });
        if (autoApplyFilters) {
          applyFilters();
        }
      }}
    />
  );
  const getParamsUrl = (): string => getPaginationParameters(filter);
  return {
    entity,
    filter,
    updateFilters,
    applyFilters,
    resetFilters,
    loadMore,
    fetchPage,
    updateLimit,
    connectFilter,
    getParamsUrl,
  };
};
export default usePagination;
