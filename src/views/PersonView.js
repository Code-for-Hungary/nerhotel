import React from 'react';
import Layout from './Layout';
import Person from '../components/Person.js';

const PersonView = (props) => {
  const personName = props.match.params.name;
  return (
    <Layout history={props.history}>
      <Person name={personName} history={props.history}/>
    </Layout>
  );
};

export default PersonView;
