import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'NOTES_APP';

export const getNotes = async () => {
  const data = await AsyncStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
};

export const saveNotes = async (notes) => {
  await AsyncStorage.setItem(KEY, JSON.stringify(notes));
};
export const deleteNote = async (id) => {
  const notes = await getNotes();
  const updatedNotes = notes.filter(note => note.id !== id);
  await saveNotes(updatedNotes);
};
