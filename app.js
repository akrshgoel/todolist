import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

export default function App() {
  const [val, setVal] = useState('');
  const [items, setItems] = useState([]);

  const addTask = () => {
    if (!val) return; 
    
    let newTodo = {
      id: Math.random().toString(),
      content: val,
      done: false
    };

    setItems([...items, newTodo]);
    setVal('');
    Keyboard.dismiss();
  };

  const remove = (index) => {
    let copy = [...items];
    copy.splice(index, 1);
    setItems(copy);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.mainTitle}>Stuff to do</Text>
      </View>

      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          placeholder="What's next?"
          value={val}
          onChangeText={setVal}
        />
        <TouchableOpacity onPress={addTask} style={styles.addBtn}>
          <Ionicons name="add-circle" size={50} color="#55BCF6" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.list}>
        {items.map((obj, i) => (
          <View key={i} style={styles.row}>
            <TouchableOpacity 
              style={styles.todoContent} 
              onPress={() => {
                let updated = [...items];
                updated[i].done = !updated[i].done;
                setItems(updated);
              }}
            >
              <Text style={[styles.txt, obj.done && styles.strike]}>{obj.content}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => remove(i)}>
              <Ionicons name="trash-outline" size={24} color="red" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
    paddingTop: 60,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 20
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  inputArea: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 25,
    flex: 1,
    marginRight: 10,
    elevation: 2,
  },
  list: {
    paddingHorizontal: 20,
  },
  row: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  todoContent: {
    flex: 1,
  },
  txt: {
    fontSize: 16,
  },
  strike: {
    textDecorationLine: 'line-through',
    opacity: 0.5
  }
});
