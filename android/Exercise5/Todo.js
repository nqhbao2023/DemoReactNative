import React from 'react';
import { List } from 'react-native-paper';
// import firestore from '@react-native-firebase/firestore';
import { TouchableOpacity } from 'react-native';

function Todo({ id, title, complete }) {
  const todoRef = firestore().collection('todos').doc(id);

  const toggleComplete = async () => {
    await todoRef.update({ complete: !complete });
  };

  const deleteTodo = async () => {
    await todoRef.delete();
  };

  return (
    <List.Item
      title={title}
      onPress={toggleComplete}
      onLongPress={deleteTodo}
      left={props => (
        <List.Icon {...props} icon={complete ? 'check' : 'cancel'} />
      )}
      right={props => (
        <TouchableOpacity onPress={deleteTodo}>
          <List.Icon {...props} icon="delete" />
        </TouchableOpacity>
      )}
    />
  );
}

export default Todo;
