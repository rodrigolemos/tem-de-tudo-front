import React, { useState, useCallback, useEffect } from 'react';

import { api } from '../../services/api';

const SelectAPI = ({ ...props }) => {
  const {
    forwardRef, apiName, filterType, name, placeholder,
  } = props;

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  const fetchItems = useCallback(async () => {
    setLoading(true);

    try {
      const response = await api.get(`/${apiName}/list`);

      if (response.status === 200) {
        let { data } = response;

        if (filterType) {
          data = data.filter((item) => item.type === filterType);
        }

        setItems(data);
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  }, [apiName, filterType]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return (
    <>
      <select ref={forwardRef} name={name} defaultValue="">
        {loading ? (
          <option value="" disabled>
            Carregando...
          </option>
        ) : (
            <>
              <option value="" disabled>
                Selecione o {placeholder}
              </option>
              {items.map((item) => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </>
          )}
      </select>
    </>
  );
};

export default SelectAPI;
