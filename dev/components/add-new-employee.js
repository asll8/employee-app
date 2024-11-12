import { LitElement, html, css } from "lit";
import { localize } from '../localization/localize.js';
import "./home-button.js"
import { connect } from '../utils/connect.js';
import generateNewId from '../utils/helpers.js';
import store from '../store/store.js'
import { addEmployee, updateEmployee } from '../store/actions.js';
import { showConfirmDialog } from '../utils/dialogUtil.js';

export class AddNewEmployee extends connect(LitElement) {

    static get styles() {
        return css`
            .add-emp-container {
                max-width: 500px;
                margin: auto;
                padding: 20px;
                background-color: white;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }

            .header-text {
                color: #ff6d00;
                font-size: 24px;
                font-weight: bold;
                text-align: center;
                margin-bottom: 20px;
            }

            .back-link {
                color: #ff6d00;
                text-decoration: none;
                display: inline-block;
                margin-bottom: 15px;
                font-size: 14px;
                cursor: pointer;
            }

            .back-link:hover {
                text-decoration: underline;
            }

            .form-group {
                margin-bottom: 15px;
            }

            label {
                display: block;
                margin-bottom: 5px;
                font-weight: bold;
                color: #ff6d00;
                font-size: 14px;
            }

            input, select {
                width: 100%;
                padding: 10px;
                font-size: 16px;
                border: 1px solid #ccc;
                border-radius: 4px;
                box-sizing: border-box;
                transition: border-color 0.3s;
            }

            input:focus, select:focus {
                border-color: #ff6d00;
                outline: none;
            }

            button {
                width: 100%;
                background-color: #ff6d00;
                color: #fff;
                padding: 12px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 16px;
                font-weight: bold;
                margin-top: 20px;
                transition: background-color 0.3s;
            }

            button:hover {
                background-color: #ff8d33;
            }

            button:disabled {
                background-color: #ccc;
                cursor: not-allowed;
            }

            .error {
                color: red;
                font-size: 14px;
                margin-top: 5px;
            }

            @media (max-width: 480px) {
                .add-emp-container {
                    padding: 15px;
                }

                .header-text {
                    font-size: 20px;
                }

                label {
                    font-size: 13px;
                }

                input, select, button {
                    font-size: 14px;
                    padding: 10px;
                }
            }

        `;
    }

    static get properties() {
        return {
            firstName: {type: String},
            lastName: {type: String},
            dateOfEmployment: {type: String},
            dateOfBirth: {type: String},
            phone: {type: String},
            email: {type: String},
            department: {type: String},
            position: {type: String},
            errors: {type: Object},
            formType: {type: String},
        }
    }

    constructor() {
        super();
        this.resetForm();
        this.formType = "add";
    }

    connectedCallback() {
        super.connectedCallback();
        this.unsubscribe = store.subscribe(() => this.updateFromState());
        this.updateFromState();
        if (this.formType === 'add') {
            this.resetForm();
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }

    updateFromState() {
        const state = store.getState();
        const selectedEmployee = state?.employees?.selectedEmployee;

        if (selectedEmployee) {
            this.formType = 'edit';
            this.populateEmployeeData(selectedEmployee);
        } else {
            this.formType = 'add';
            this.resetForm();
        }
    }

    populateEmployeeData(employee) {
        this.firstName = employee.firstName || '';
        this.lastName = employee.lastName || '';
        this.dateOfEmployment = employee.dateOfEmployment || '';
        this.dateOfBirth = employee.dateOfBirth || '';
        this.phone = employee.phone || '';
        this.email = employee.email || '';
        this.department = employee.department || localize("departmentOptionAnalytics");
        this.position = employee.position || localize("positionOptionJunior");
    }

    get formFields() {
        return [
            { label: localize("labelFirstName"), type: "text", property: "firstName", placeholder: localize("labelFirstName") },
            { label: localize("labelLastName"), type: "text", property: "lastName", placeholder: localize("labelLastName") },
            { label: localize("labelDateEmployment"), type: "date", property: "dateOfEmployment", placeholder: localize("placeholderDate") },
            { label: localize("labelDateBirth"), type: "date", property: "dateOfBirth", placeholder: localize("placeholderDate") },
            { label: localize("labelPhone"), type: "text", property: "phone", placeholder: localize("placeholderPhone") },
            { label: localize("labelEmail"), type: "email", property: "email", placeholder: localize("labelEmail") },
            {
                label: localize("labelDepartment"),
                type: "select",
                property: "department",
                options: [localize("departmentOptionAnalytics"), localize("departmentOptionTech")]
            },
            {
                label: localize("labelPosition"),
                type: "select",
                property: "position",
                options: [localize("positionOptionJunior"), localize("positionOptionMedior"), localize("positionOptionSenior")]
            }
        ]
    }

    render() {
        const state = store.getState();
        const selectedEmployee = state.employees.selectedEmployee;        
        
        this.formType = selectedEmployee ? 'edit' : 'add';
    
        if (this.formType === 'edit') {
            this.populateEmployeeData(selectedEmployee);
        }

        return html `
            <div class="add-emp-container">
                <home-button></home-button>
                <h2 class="header-text">${this.formType === 'edit' ? "Edit" : localize("addEmployeeHeader")}</h2>
                ${this.formFields.map(field => this.renderField(field))}
                <button @click="${this.handleSubmit}">
                    ${this.formType === 'edit' ? localize("editEmployeeButtonText") : localize("addEmployeeButtonText")}
                </button>
            </div>
        `
    }

    renderField(field) {
        const {label, type, property, placeholder, options } = field;
        const value = this[property];
        const error = this.errors[property];

        if (type === 'select') {
            return html `
                <div class="form-group">
                    <label class="field-text">${label}</label>
                    <select .value=${value} @change=${(e) => this.handleInput(e, property)}>
                        ${options.map(option => html`<option value="${option}">${option}</option>`)}
                    </select>
                    ${error ? html`<div class="error">${error}</div>` : ''}
                </div>
            `
        }

        return html `
            <div class="form-group">
                <label class="field-text">${label}</label>
                <input 
                    type="${type}"
                    .value="${value}"
                    placeholder="${placeholder || ""}"
                    @input="${(e) => this.handleInput(e, property)}"
                />
                ${error ? html`<div class="error">${error}</div>` : ''}
            </div>
        `
    }

    handleInput(e, property) {
        const { type, value } = e.target;
        this[property] = type === 'checkbox' ? e.target.checked : value;
        this.requestUpdate();
    }

    validate() {
        const errors = {};

        const validationRules = [
            { 
                field: 'firstName', 
                required: true, 
                message: localize("firstNameWarningMsg")
            },
            { 
                field: 'lastName', 
                required: true, 
                message: localize("lastNameWarningMsg")
            },
            { 
                field: 'dateOfEmployment', 
                required: true, 
                message: localize("dateEmploymentWarningMsg")
            },
            { 
                field: 'dateOfBirth', 
                required: true, 
                message: localize("dateBirthWarningMsg")
            },
            { 
                field: 'phone', 
                required: true, 
                //pattern: /^\+\d{1,3}[- ]?\d{3}[- ]?\d{3}[- ]?\d{2}[- ]?\d{2}$/,
                message: localize("phoneWarningMsg")
            },
            { 
                field: 'email', 
                required: true, 
                pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: localize("emailWarningMsg")
            }
        ];

        validationRules.forEach(({ field, required, pattern, message}) => {
            const value = this[field];

            if (required && !value) {
                errors[field] = message;
            } else if (pattern && !pattern.test(value)) {
                errors[field] = message;
            }
        });

        this.errors = errors;
        return Object.keys(errors).length === 0;
    }

    handleSubmit() {
        if (this.validate()) {
            const employeeData = {
                id: this.formType === 'edit' ? this.selectedEmployee?.id : generateNewId(),
                firstName: this.firstName,
                lastName: this.lastName,
                dateOfEmployment: this.dateOfEmployment,
                dateOfBirth: this.dateOfBirth,
                phone: this.phone,
                email: this.email,
                department: this.department,
                position: this.position
            };
    
            if (this.formType === 'edit') {
                showConfirmDialog(
                    localize("confirmDialogHeader"),
                    localize("editConfirmationText"),
                    localize("proceedButtonText"),
                    localize("cancelButtonText"),
                    () => {
                      store.dispatch(updateEmployee(employeeData));
                      this.navigateToEmployeeList();
                    },
                    () => {}
                  );
            } else {
                store.dispatch(addEmployee(employeeData));
            }
    
            this.resetForm();
            window.history.pushState({}, '', '/dev/employees');
            window.dispatchEvent(new CustomEvent('location-changed'));
        } else {
            console.log("Validation failed", this.errors); // Debug line if validation fails
        }
    }

    navigateToEmployeeList() {
        window.history.pushState({}, '', '/dev/employees');
        window.dispatchEvent(new PopStateEvent('popstate'));
    }

    resetForm() {
        this.firstName = '';
        this.lastName = '';
        this.dateOfEmployment = '';
        this.dateOfBirth = '';
        this.phone = '';
        this.email = '';
        this.department = localize("departmentOptionAnalytics");
        this.position = localize("positionOptionJunior");
        this.errors = {};
        this.formType = 'add';
    }
}

window.customElements.define('add-new-employee', AddNewEmployee);