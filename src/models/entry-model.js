import promisePool from '../utils/database.js';

const listAllEntries = async () => {
  const query = 'SELECT entry_id, user_id, entry_date, mood, weight, sleep_hours, notes, created_at FROM DiaryEntries'
  const [rows] = await promisePool.query(query,);
  console.log('selectAllDiaryEntries result', rows);
  return rows;
};


const findEntryById = async (id) => {
  try {
    const query = 'SELECT entry_id, user_id, entry_date, mood, weight, sleep_hours, notes, created_at FROM DiaryEntries WHERE entry_id = ?'
    const [rows] = await promisePool.query(query, [id]);
    console.log(rows);
    // return only first item of the result array
    return rows[0];
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};

const updateEntry = async (id, mood) => {
  try {
    const query = 'UPDATE DiaryEntries SET mood = ? WHERE entry_id = ?'
    const result = await promisePool.query(query, [mood, id]);
    console.log(result);
    // return only first item of the result array
    return result;
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};

const addEntry = (entry) => {
  const {user_id, entry_date, mood, weight, sleep_hours, notes} = entry;
  const newId = diaryEntries[0].entry_id + 1;
  diaryEntries.unshift({entry_id: newId, entry_date, mood, weight, sleep_hours, notes, user_id});
};

export {listAllEntries, findEntryById, addEntry, updateEntry};
