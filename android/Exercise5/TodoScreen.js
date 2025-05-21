import React, { useState, useEffect } from 'react';
import { FlatList, View, Text } from 'react-native';
import { Appbar, TextInput, Button } from 'react-native-paper';
// import firestore from '@react-native-firebase/firestore';
import Todo from './Todo';

function TodoScreen() {
  const [todo, setTodo] = useState('');
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);

  const todosRef = firestore().collection('todos');

  useEffect(() => {
    const unsubscribe = todosRef.onSnapshot((querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        const { title, complete } = doc.data();
        list.push({ id: doc.id, title, complete });
      });
      setTodos(list);
      if (loading) setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addTodo = async () => {
    if (todo.trim().length === 0) return;
    await todosRef.add({ title: todo, complete: false });
    setTodo('');
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Appbar>
        <Appbar.Content title="TODOs List" />
      </Appbar>
      {todos.length === 0 ? (
        <Text style={{ textAlign: 'center', padding: 10 }}>No todos yet!</Text>
      ) : (
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Todo {...item} />}
        />
      )}
      <TextInput
        label="New Todo"
        value={todo}
        onChangeText={setTodo}
        style={{ margin: 10 }}
      />
      <Button mode="contained" onPress={addTodo} style={{ margin: 10 }}>
        Add TODO
      </Button>
    </View>
  );
}

export default TodoScreen;
