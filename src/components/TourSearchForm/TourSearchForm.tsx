import React, { useState, useEffect, useRef } from 'react';
import { getCountries, searchGeo } from '@/api/api';
import { renderIcon } from '@/constants/renderIcon';
import styles from './TourSearchForm.module.scss';

type GeoEntity = {
  id: string | number;
  name: string;
  type: 'country' | 'city' | 'hotel';
  countryId?: string;
};

type TourSearchFormProps = {
  submit: (countryID: string) => void;
  disabled: boolean;
};

export const TourSearchForm: React.FC<TourSearchFormProps> = ({
  submit,
  disabled,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<GeoEntity[]>([]);
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selected, setSelected] = useState<GeoEntity | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  const loadCountries = () => {
    setLoading(true);
    getCountries()
      .then((res) => res.json())
      .then((data: Record<string, GeoEntity>) => {
        setOptions(Object.values(data).map((c) => ({ ...c, type: 'country' })));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleFocus = () => {
    setDropdownOpen(true);

    if (!inputValue && !selected) {
      loadCountries();
      return;
    }

    if (selected?.type === 'country') {
      loadCountries();
      return;
    }

    if (selected?.type === 'city' || selected?.type === 'hotel') {
      handleSearch(inputValue);
      return;
    }
  };

  const handleSearch = (query: string) => {
    setLoading(true);
    searchGeo(query)
      .then((res) => res.json())
      .then((data: Record<string, GeoEntity>) => {
        setOptions(Object.values(data));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setSelected(null);
    if (value) {
      handleSearch(value);
      setDropdownOpen(true);
    } else {
      handleFocus();
    }
  };

  const handleSelect = (option: GeoEntity) => {
    setSelected(option);
    setInputValue(option.name);
    setDropdownOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDropdownOpen(false);
    if (selected) {
      submit(selected.id.toString());
    } else {
      alert('Будь ласка, оберіть елемент зі списку');
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div>
        <input
          type='text'
          ref={inputRef}
          value={inputValue}
          onChange={handleChange}
          onFocus={handleFocus}
          placeholder='Введіть країну, місто або готель'
        />

        {dropdownOpen && (
          <ul className={styles.dropdown} ref={dropdownRef}>
            {loading && <li>Loading...</li>}
            {!loading && options.length === 0 && <li>Нічого не знайдено</li>}
            {!loading &&
              options.map((opt) => (
                <li
                  key={opt.id}
                  onClick={() => handleSelect(opt)}
                  className={styles.liOptions}
                >
                  {renderIcon(opt.type)} {opt.name}
                </li>
              ))}
          </ul>
        )}

        <button type='submit' disabled={disabled}>
          {disabled ? 'Пошук...' : 'Знайти'}
        </button>
      </div>
    </form>
  );
};
