export const testAction = () => ({ type: 'TEST_ACTION' });

export const ADD_EMPLOYEE = 'ADD_EMPLOYEE';
export const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE';
export const UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE';
export const SELECT_EMPLOYEE_FOR_EDIT = 'SELECT_EMPLOYEE_FOR_EDIT';
export const CLEAR_SELECTED_EMPLOYEE = 'CLEAR_SELECTED_EMPLOYEE';

export const addEmployee = (employee) => ({ type: ADD_EMPLOYEE, payload: employee });
export const deleteEmployee = (id) => ({ type: DELETE_EMPLOYEE, payload: id });
export const updateEmployee = (employee) => ({ type: UPDATE_EMPLOYEE, payload: employee });
export const selectEmployeeForEdit = (employee) => ({ type: SELECT_EMPLOYEE_FOR_EDIT, payload: employee });
export function clearSelectedEmployee() {
    return {
        type: CLEAR_SELECTED_EMPLOYEE
    };
}