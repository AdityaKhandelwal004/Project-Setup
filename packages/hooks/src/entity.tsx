import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Actions } from '@mono/redux-global';

interface Entity<T> {
    entity: T;
    refreshEntity: () => void;
    loaderState: boolean;
}
export const useEntity = <T,>(endpoint: string, entityId?:(string | number)): (Entity<T | undefined>) => {
  const { id } = useParams<{ id?: string }>();
  const reduxDispatch:any = useDispatch();
  const [entity, setEntity] = useState<T | undefined>(undefined);
  const [refresh, setRefresh] = useState(false);
  const [loaderState, setLoaderState] = useState<boolean>(false);
  useEffect(() => {
    if (id || entityId) {
      setLoaderState(true);
      reduxDispatch(Actions.apiCall(`${endpoint}/${entityId || id}`, (res) => 
        {
          setLoaderState(false);
        setEntity(res);
      }, (err) => { 
        setLoaderState(false);
        console.log(err); })); // eslint-disable-line no-console
    }
  }, [refresh]);

  const refreshEntity = () => {
    setRefresh((prevRefresh) => !prevRefresh);
  };

  return { entity, refreshEntity, loaderState};
};
