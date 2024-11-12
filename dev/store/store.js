import { createStore } from 'redux';

// Action Types
const ADD_EMPLOYEE = 'ADD_EMPLOYEE';
const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE';
const UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE';
const SELECT_EMPLOYEE_FOR_EDIT = 'SELECT_EMPLOYEE_FOR_EDIT';
const CLEAR_SELECTED_EMPLOYEE = 'CLEAR_SELECTED_EMPLOYEE';

// Initial state
const initialState = {
  employees: {
    list: [],
    selectedEmployee: null,
  },
};

// Reducer function
function employeeReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_EMPLOYEE:
      return {
        ...state,
        employees: {
          ...state.employees,
          list: [...state.employees.list, action.payload],
        },
      };
    case DELETE_EMPLOYEE:
      return {
        ...state,
        employees: {
          ...state.employees,
          list: state.employees.list.filter(emp => emp.id !== action.payload),
        },
      };
case UPDATE_EMPLOYEE:
  return {
    ...state,
    employees: {
      ...state.employees,
      list: state.employees.list.map(emp =>
        emp.id === action.payload.id ? { ...emp, ...action.payload } : emp
      ),
    },
  };
    case SELECT_EMPLOYEE_FOR_EDIT:
      return {
        ...state,
        employees: {
          ...state.employees,
          selectedEmployee: action.payload,
        },
      };
    case CLEAR_SELECTED_EMPLOYEE:
      return {
        ...state,
        employees: {
          ...state.employees,
          selectedEmployee: null,
        },
      };
    default:
      return state;
  }
}

// Action Creators
export function addEmployee(employee) {
  return { type: ADD_EMPLOYEE, payload: employee };
}

export function deleteEmployee(employeeId) {
  return { type: DELETE_EMPLOYEE, payload: employeeId };
}

export function updateEmployee(employee) {
  return { type: UPDATE_EMPLOYEE, payload: employee };
}

export function selectEmployeeForEdit(employee) {
  return { type: SELECT_EMPLOYEE_FOR_EDIT, payload: employee };
}

export function clearSelectedEmployee() {
  return { type: CLEAR_SELECTED_EMPLOYEE };
}

// Create store
const store = createStore(employeeReducer);

export default store;
