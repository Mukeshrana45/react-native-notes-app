import { View, Text, FlatList, Button, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import { getNotes, deleteNote } from '../storage/noteStorage';

export default function HomeScreen({ navigation }) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const loadNotes = async () => {
      const data = await getNotes();
      setNotes(data);
    };

    const unsubscribe = navigation.addListener('focus', loadNotes);
    return unsubscribe;
  }, [navigation]);

  const handleDelete = async (id) => {
    await deleteNote(id);
    const data = await getNotes();
    setNotes(data);
  };

  return (
    <View>
      <Button title="Add Note" onPress={() => navigation.navigate('AddEdit')} />

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>No notes yet</Text>}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>

            <Pressable onPress={() => handleDelete(item.id)}>
              <Text style={{ color: 'red' }}>Delete</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}
