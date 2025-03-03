import React, { useState } from 'react';

const TablaGenerica = ({
  columns,
  data,
  title,
  addButtonText,
  onAdd,
  filterFunction,
  filterPlaceholder,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = filterFunction(data, searchQuery);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Encabezado con fondo */}
      <div className="bg-gray-50 p-6 rounded-t-lg shadow-sm">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">{title}</h1>
          <button
            onClick={onAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            {addButtonText}
          </button>
        </div>
      </div>

      {/* Barra de búsqueda con fondo */}
      <div className="bg-gray-50 p-6 border-b border-gray-200">
        <input
          type="text"
          placeholder={filterPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Tabla con margen interno */}
      <div className="bg-white rounded-b-lg shadow-md">
        <div className="p-6">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.name}
                    className="px-4 py-2 text-left text-sm font-medium text-gray-700 uppercase"
                  >
                    {column.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row) => (
                <tr key={row._id} className="hover:bg-gray-50">
                  {columns.map((column) => (
                    <td key={column.name} className="px-4 py-2 text-sm text-gray-700">
                      {column.selector ? column.selector(row) : column.cell(row)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TablaGenerica;