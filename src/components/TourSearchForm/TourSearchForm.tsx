import React, { useState, useEffect, useRef } from 'react';
import { getCountries, searchGeo } from '../../api/api';

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

export const TourSearchForm: React.FC<TourSearchFormProps> = ({ submit, disabled }) => {
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

  const renderIcon = (type: string) => {
    switch (type) {
      case 'country':
        return '🌎';
      case 'city':
        return '🏙️';
      case 'hotel':
        return '🏨';
      default:
        return '';
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ position: 'relative', width: 300 }}>
      <input
        type='text'
        ref={inputRef}
        value={inputValue}
        onChange={handleChange}
        onFocus={handleFocus}
        placeholder='Введіть країну, місто або готель'
        style={{ width: '100%', padding: '8px' }}
      />
      {dropdownOpen && (
        <ul
          ref={dropdownRef}
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            maxHeight: 200,
            overflowY: 'auto',
            border: '1px solid #ccc',
            backgroundColor: '#fff',
            listStyle: 'none',
            padding: 0,
            margin: 0,
            zIndex: 100,
          }}
        >
          {loading && <li style={{ padding: 8 }}>Loading...</li>}
          {!loading && options.length === 0 && (
            <li style={{ padding: 8 }}>Нічого не знайдено</li>
          )}
          {!loading &&
            options.map((opt) => (
              <li
                key={opt.id}
                onClick={() => handleSelect(opt)}
                style={{ padding: 8, cursor: 'pointer' }}
              >
                {renderIcon(opt.type)} {opt.name}
              </li>
            ))}
        </ul>
      )}
      <button
        type='submit'
        disabled={disabled}
        style={{ marginTop: 8, padding: 8 }}
      >
        {disabled ? 'Пошук...' : 'Знайти'}
      </button>
    </form>
  );
};

