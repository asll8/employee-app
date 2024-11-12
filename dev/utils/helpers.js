import store from '../store/store.js';

//Creating generic employee id
export default function generateNewId() {
    const state = store.getState();
    const employees = state.employee?.employees || [];
    const maxId = employees.length > 0 ? Math.max(...employees.map(emp => emp.id)) : 0;
    return maxId + 1;
}