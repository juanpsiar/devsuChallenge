import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { ProductsInfo, FormData } from '../models/general.interaces';
import moment from 'moment';
import { createProduct, updateProduct, verificationID } from '../services/requestMethods';
import '../styles/FormProduct.css';

const FormProduct: React.FC<FormData> = ({ dataForm, updateListProducts }) => {
  const emptyValuesForm: ProductsInfo = {
    id: '',
    name: '',
    description: '',
    logo: '',
    date_release: '',
    date_revision: '',
  };

  const [formData, setFormData] = useState<ProductsInfo>(emptyValuesForm);
  const [errors, setErrors] = useState<Partial<ProductsInfo>>({});

  useEffect(() => {
    if (dataForm && Object.keys(dataForm).length > 0) {
      setFormData(dataForm);
    }
  }, [dataForm]);

  const [typingTimer, setTypingTimer] = useState<NodeJS.Timeout | null>(null);
  const doneTypingInterval = 1500;

  const doneTyping = async (idToCheck: string, errorsList: Partial<ProductsInfo>) => {
    if (idToCheck.length > 0) {
      verificationID({ id: idToCheck })
        .then((response) => {
          if (response) {
            setErrors({ ...errorsList, id: 'ID ya registrado' });
          }
        })
        .catch((error) => console.error(error));
    }
  };

  const onTyping = (textTyped: string, listErrors: Partial<ProductsInfo>) => {
    if (typingTimer) {
      clearTimeout(typingTimer);
    }
    setTypingTimer(setTimeout(() => doneTyping(textTyped, listErrors), doneTypingInterval));
  };

  useEffect(() => {
    return () => {
      if (typingTimer) {
        clearTimeout(typingTimer);
      }
    };
  }, [typingTimer]);

  const validationFormValues = (key: string, value: string) => {
    const lengthValues: { [key: string]: { min: number; max: number; label: string } } = {
      id: { min: 3, max: 10, label: 'ID' },
      name: { min: 5, max: 100, label: 'Nombre' },
      description: { min: 10, max: 200, label: 'Descripción' },
    };
    const validationErrors: Partial<ProductsInfo> = errors;
    const flagEmptyValue = value.length === 0;
    switch (key) {
      case 'date_release':
      case 'date_revision':
        if (flagEmptyValue) {
          validationErrors[key] = 'Fecha Liberación requerida';
        } else {
          validationErrors[key] = moment(value).isBefore(moment().startOf('day'))
            ? 'Fecha liberación debe ser mayor o igual a la fecha actual'
            : '';
        }
        break;
      case 'logo':
        validationErrors[key] = flagEmptyValue ? 'Logo Requerido' : '';
        break;

      default:
        if (
          flagEmptyValue ||
          value.length < lengthValues[key].min ||
          value.length > lengthValues[key].max
        ) {
          validationErrors[key] = flagEmptyValue
            ? `${lengthValues[key].label} required`
            : `${lengthValues[key].label} mínimo ${lengthValues[key].min} y máximo ${lengthValues[key].max} caracteres`;
        } else {
          validationErrors[key] = '';
        }
        break;
    }

    if (validationErrors.id === '') {
      onTyping(value, validationErrors);
    } else {
      setErrors(validationErrors);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    let newFormValue = { ...formData, [name]: value };

    if (value.length > 0 && name === 'date_release') {
      const dateRevission = moment(value).add(1, 'year').format('YYYY-MM-DD');
      newFormValue = { ...newFormValue, date_revision: dateRevission };
    }
    setFormData(newFormValue);
    validationFormValues(name, value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (dataForm) {
      updateProduct(formData)
        .then((response) => {
          updateListProducts(response);
        })
        .catch((err) => console.error(err));
    } else {
      createProduct(formData)
        .then((response) => {
          updateListProducts(response);
        })
        .catch((err) => console.error(err));
    }
    setFormData(emptyValuesForm);
    setErrors({});
  };

  const handleReset = () => {
    setFormData({ ...emptyValuesForm, id: formData.id });
    setErrors({});
  };

  const checkEmptyValues = (objectToCheck: Partial<ProductsInfo>) => {
    let flagSubmitButton = false;
    let arrayKeys = Object.keys(objectToCheck);
    for (let i = 0; i < arrayKeys.length; i++) {
      if (objectToCheck[arrayKeys[i]] === '') {
        flagSubmitButton = true;
        i = arrayKeys.length;
      }
    }

    return flagSubmitButton;
  };

  const checkNotEmptyValues = (objectToCheck: Partial<ProductsInfo>) => {
    let flagSubmitButton = false;
    let arrayKeys = Object.keys(objectToCheck);
    for (let i = 0; i < arrayKeys.length; i++) {
      if (objectToCheck[arrayKeys[i]] !== '') {
        flagSubmitButton = true;
        i = arrayKeys.length;
      }
    }

    return flagSubmitButton;
  };

  const handleSubmitActivation = () => {
    let disableButton = checkEmptyValues(formData);

    if (!disableButton) {
      disableButton = checkNotEmptyValues(errors);
    }

    return disableButton;
  };

  return (
    <div className="form-container">
      <h3>Formulario de {formData.id.length > 0 ? 'Edición' : 'Registro'}</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="id">ID:</label>
          <input
            type="text"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleChange}
            disabled={dataForm && dataForm.id?.length > 0}
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
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          {errors?.description && errors?.description.length > 0 && (
            <span>{errors.description}</span>
          )}
        </div>
        <div>
          <label htmlFor="logo">Logo:</label>
          <input type="text" id="logo" name="logo" value={formData.logo} onChange={handleChange} />
          {errors?.logo && errors?.logo.length > 0 && <span>{errors.logo}</span>}
        </div>
        <div>
          <label htmlFor="date_release">Fecha Liberación:</label>
          <input
            type="date"
            id="date_release"
            name="date_release"
            value={
              formData.date_release.length > 0
                ? moment(formData.date_release).format('YYYY-MM-DD')
                : ''
            }
            onChange={handleChange}
          />{' '}
          {errors?.date_release && errors?.date_release.length > 0 && (
            <span>{errors.date_release}</span>
          )}
        </div>
        <div>
          <label htmlFor="date_revision">Fecha Revisión:</label>
          <input
            type="date"
            id="date_revision"
            name="date_revision"
            value={
              formData.date_revision.length > 0
                ? moment(formData.date_revision).format('YYYY-MM-DD')
                : ''
            }
            onChange={handleChange}
            disabled
          />
        </div>
        <div className="form-button-container">
          <button className="form-button-reset" type="button" onClick={handleReset}>
            Reiniciar
          </button>
          <button className="form-button-submit" type="submit" disabled={handleSubmitActivation()}>
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormProduct;
