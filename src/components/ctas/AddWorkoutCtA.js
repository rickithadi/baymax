import React from "react";
import { Card, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const AddWorkoutCtA = () => (
    <Card centered>
      <Card.Content textAlign="center">
        <Card.Header>Add new workout</Card.Header>
        <Link to="/workouts/new">
          <Icon name="plus circle" size="massive" />
        </Link>
      </Card.Content>
    </Card>
);

export default AddWorkoutCtA;
