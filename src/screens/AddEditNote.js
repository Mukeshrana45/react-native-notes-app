import { View, TextInput, Button } from 'react-native';
import { useState } from 'react';
import { getNotes, saveNotes } from '../storage/noteStorage';

export default function AddEditNote({ navigation }) {
  const [title, setTitle] = useState('');

  const save = async () => {
    if (!title.trim()) return;

    const notes = await getNotes();
    const newNote = {
      id: Date.now().toString(),
      title,
    };

    await saveNotes([...notes, newNote]);
    navigation.goBack();
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Note title"
        onChangeText={setTitle}
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />
      <Button title="Save Note" onPress={save} />
    </View>
  );
}
