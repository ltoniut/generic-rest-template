import {
  RDS_DATABASE_NAME,
  RDS_DATABASE_PORT,
  RDS_HOST_NAME,
} from '../defaults';

export default {
  '$schema': 'http://json-schema.org/schema',
  'id': 'SchematicsNestApplication',
  'title': 'Nest Application Options Schema',
  'questions': [
    {
      type: 'input',
      name: 'name',
      message: 'Nombre del servicio Rest?',
      validate: (value) => {
        return !!value.trim() || 'Please enter a name for the project';
      }
    },
    {
      type: 'input',
      name: 'author',
      message: 'Quién es el autor del proyecto?',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Cual es la descipción del proyecto?',
    },
    {
      type: 'input',
      name: 'version',
      message: 'Cual es la versión del proyecto?',
      default: '0.0.1'
    },
    {
      type: 'number',
      name: 'port',
      message: 'En qué puerto va a correr?',
      default: 3000
    },
    {
      type: 'confirm',
      name: 'persistence',
      message: 'Quieres sobreescribir las configuraciones de bases de datos predeterminadas?',
      default: false
    },
    {
      type: 'input',
      name: 'rdsHostName',
      message: 'Host de la bases de datos?',
      validate: (value) => {
        return !!value.trim() || 'Por favor seleccione el host de la bases de datos';
      },
      when: (answers) => {
        return answers.persistence;
      },
      default: RDS_HOST_NAME
    },
    {
      type: 'input',
      name: 'rdsUsername',
      message: 'Nombre de usuario de la bases de datos?',
      validate: (value) => {
        return !!value.trim() || 'Por favor seleccione el nombre de usuario de la base de datos';
      },
    },
    {
      type: 'password',
      name: 'rdsPassword',
      message: 'Password de la bases de datos?',
      validate: (value) => {
        return !!value.trim() || 'Por favor seleccione el password de la conexión de bases de datos';
      },
    },
    {
      type: 'input',
      name: 'rdsDbName',
      message: 'Nombre de la bases de datos?',
      validate: (value) => {
        return !!value.trim() || 'Por favor seleccione el nombre de la base de datos';
      },
      when: (answers) => {
        return answers.persistence;
      },
      default: RDS_DATABASE_NAME,
    },
    {
      type: 'number',
      name: 'rdsDbPort',
      message: 'Puerto de la bases de datos?',
      when: (answers) => {
        return answers.persistence;
      },
      default: RDS_DATABASE_PORT,
    },
  ]
}