import React, { useState, ChangeEvent, FormEvent } from 'react';
import { ProductsInfo, TableColumns } from '../models/general.interaces';

interface FormData {
  dataForm: ProductsInfo;
}

const FormProduct: React.FC<FormData> = ({ dataForm }) => {
  const emptyValuesForm: ProductsInfo = {
    id: '',
    name: '',
    description: '',
    logo: '',
    date_release: '',
    date_revision: '',
  };
  console.log({ dataForm });

  const [formData, setFormData] = useState<ProductsInfo>(emptyValuesForm);

  const [errors, setErrors] = useState<Partial<ProductsInfo>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors: Partial<ProductsInfo> = {};

    // Perform field validation
    if (!formData.id) {
      validationErrors.id = 'ID is required';
    }

    if (!formData.name) {
      validationErrors.name = 'Name is required';
    }

    if (!formData.description) {
      validationErrors.description = 'Description is required';
    }

    // ... Perform validation for other fields

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // If all fields are valid, proceed with form submission
    // Submit the form data to your backend or perform any desired actions
    console.log(formData);
    // Reset the form
    setFormData(emptyValuesForm);
    setErrors({});
  };

  const handleReset = () => {
    setFormData(emptyValuesForm);
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="id">ID:</label>
        <input
          type="text"
          id="id"
          name="id"
          value={formData.id}
          onChange={handleChange}
          disabled={dataForm && Object.keys(dataForm).length > 0}
        />
        {errors.id && <span>{errors.id}</span>}
      </div>
      <div>
        <label htmlFor="name">Nombre:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
        {errors.name && <span>{errors.name}</span>}
      </div>
      <div>
        <label htmlFor="description">Descripción:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        {errors.description && <span>{errors.description}</span>}
      </div>
      <div>
        <label htmlFor="logo">Logo:</label>
        <input type="text" id="logo" name="logo" value={formData.logo} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="dateRelease">Fecha Liberación:</label>
        <input
          type="date"
          id="dateRelease"
          name="dateRelease"
          value={formData.dateRelease}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="dateRevision">Fecha Revisión:</label>
        <input
          type="date"
          id="dateRevision"
          name="dateRevision"
          value={formData.dateRevision}
          onChange={handleChange}
          disabled
        />
      </div>
      <button type="button" onClick={handleReset}>
        Reiniciar
      </button>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default FormProduct;
