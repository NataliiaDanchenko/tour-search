import React from 'react';

export type HotelInfoProps = {
  hotel: {
    id: string | number;
    name: string;
    img: string;
    cityName: string;
    countryName: string;
    countryId: string; // теперь обязательно string
    description?: string;
    services?: Record<string, string>;
  } | null;
  showDescription?: boolean;
  showServices?: boolean;
};

export const countryFlags: Record<string, string> = {
  '43': 'eg', 
  '115': 'tr', 
  '34': 'gr', 
};

export const HotelInfo: React.FC<HotelInfoProps> = ({
  hotel,
  showDescription = true,
  showServices = true,
}) => {
  if (!hotel) {
    return (
      <div style={{ color: 'red', padding: 10 }}>Hotel data not available</div>
    );
  }

  const { name, img, cityName, countryName, countryId, description, services } =
    hotel;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderBottom: '1px solid #ccc',
      }}
    >
      {img && (
        <img
          src={img}
          alt={name}
          style={{ width: '100%', height: 150, objectFit: 'cover' }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
        />
      )}

      <div style={{ padding: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          {countryId && countryFlags[countryId] && (
            <img
              src={`https://flagcdn.com/24x18/${countryFlags[countryId]}.png`}
              alt={`${countryName} flag`}
              width={24}
              height={18}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
            />
          )}
          <h3 style={{ margin: 0 }}>{name}</h3>
        </div>

        <p style={{ margin: '5px 0' }}>
          {cityName}, {countryName}
        </p>

        {showDescription && description && (
          <p style={{ fontSize: 14, color: '#555' }}>{description}</p>
        )}

        {showServices && services && Object.keys(services).length > 0 && (
          <div
            style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 5 }}
          >
            {Object.entries(services).map(([service, value]) => (
              <span
                key={service}
                style={{
                  padding: '2px 6px',
                  border: '1px solid #aaa',
                  borderRadius: 4,
                  fontSize: 12,
                  backgroundColor: value === 'yes' ? '#d4edda' : '#f8d7da',
                  color: '#333',
                }}
              >
                {service.toUpperCase()}: {value}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
