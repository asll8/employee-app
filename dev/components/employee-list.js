import { LitElement, html, css } from "lit";
import { repeat } from 'lit-html/directives/repeat.js';
import { localize } from '../localization/localize.js';
import { connect } from '../utils/connect.js';
import generateNewId from '../utils/helpers.js';
import store from '../store/store.js'
import { selectEmployeeForEdit, clearSelectedEmployee, deleteEmployee } from '../store/actions.js';
import { showConfirmDialog } from '../utils/dialogUtil.js';

export class EmployeeList extends connect(LitElement) {

    static get styles() {
        return css`
            :host {
                display: block;
                font-family: Arial, sans-serif;
                background-color: #F0F0F0;
            }
    
            .employee-container {
                width: 100%;
                max-width: 1200px;
                margin: auto;
                border-radius: 8px;
                overflow: hidden;
            }
    
            .search-bar-container {
                padding: 12px;
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                background-color: #ffffff;
            }
    
            .search-bar {
                padding: 8px;
                font-size: 14px;
                border: 1px solid #ddd;
                border-radius: 4px;
                width: 200px;
            }
    
            .add-new {
                background-color: transparent;
                color: #ff6d00;
                padding: 8px 12px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 14px;
                margin-top: 10px;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: row;
            }

            .add-new:hover {
                text-decoration: underline;
            }
    
            .checkbox-cell {
                width: 40px;
                text-align: center;
            }
    
            .checkbox-cell input {
                cursor: pointer;
            }
    
            .employee-header {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: baseline;
                padding: 12px;
            }
    
            .header-text, .field-text-list {
                color: #ff6d00;
            }

            .field-text-list {
                margin: 2px 8px;
            }
    
            .view-toggle {
                display: flex;
                gap: 8px;
                margin-bottom: 16px;
            }
    
            .view-toggle button {
                background: none;
                border: none;
                cursor: pointer;
                padding: 8px;
            }
    
            .view-toggle button.active {
                border: 2px solid #ff6d00;
                color: #ff6d00;
                border-radius: 4px;
                background-color: transparent;
            }
    
            table {
                width: 100%;
                border-collapse: collapse;
                overflow-x: auto;
                background-color: #ffffff;
            }
    
            th, td {
                padding: 15px 8px;
                text-align: center;
                white-space: nowrap;
            }
    
            th {
                background-color: #ffffff;
                color: #333;
                font-weight: bold;
            }
    
            tbody tr:hover {
                background-color: #f1f1f1;
            }
    
            td {
                padding: 12px;
                text-align: center;
                vertical-align: middle;
                border-bottom: 1px solid #ddd;
                font-size: 14px;
                color: #333;
            }
    
            .list-view {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                gap: 16px;
                padding: 16px;
            }
    
            .list-item {
                border: 1px solid #ddd;
                border-radius: 8px;
                padding: 16px;
                background-color: #f9f9f9;
                width: calc(33.33% - 20px);
                box-sizing: border-box;
            }
    
            .employee-grid {
                display: grid;
                grid-template-columns: repeat(1, 1fr);
                grid-template-rows: repeat(3, auto);
                gap: 8px;
            }
    
            .grid-item {
                display: flex;
                align-items: center;
                font-size: 14px;
            }
    
            .actions {
                display: flex;
                gap: 8px;
                justify-content: center;
            }
    
            .actions.table {
                justify-content: flex-end;
            }
    
            .actions button {
                background-color: transparent;
                border: none;
                cursor: pointer;
                font-size: 16px;
                padding: 8px;
                transition: background-color 0.2s ease;
            }
    
            .actions button:hover {
                background-color: #f0f0f0;
                border-radius: 4px;
            }
    
            .pagination-container {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 4px;
                font-size: 16px;
                margin-top: 15px;
            }
    
            .pagination-container button {
                background-color: transparent;
                border: none;
                cursor: pointer;
                padding: 6px 10px;
                color: gray;
                font-weight: 600;
                border-radius: 50%;
                outline: none;
                transition: background-color 0.3s, color 0.3s;
            }
    
            .pagination-container button:disabled {
                color: #ddd;
                cursor: not-allowed;
            }
    
            .pagination-container button.active {
                background-color: #ff6d00;
                color: white;
                font-weight: bold;
            }
    
            .pagination-container .ellipsis {
                color: gray;
                font-weight: normal;
                cursor: default;
                padding: 0 5px;
            }
    
            .pagination-container .arrow {
                color: #ff6d00;
                cursor: pointer;
                font-size: 18px;
                padding: 0 10px;
                transition: color 0.3s;
            }
    
            .pagination-container .arrow:hover:not(:disabled) {
                color: #ff8d33;
            }
    
            @media (max-width: 768px) {
                .search-bar-container {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 8px;
                }
    
                .search-bar,
                .add-new {
                    width: 100%;
                    font-size: 14px;
                }
    
                .employee-header {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 8px;
                }
    
                .list-item {
                    width: 100%;
                }
    
                th, td {
                    font-size: 12px;
                    padding: 6px;
                }
    
                .pagination-container {
                    font-size: 14px;
                }
            }
    
            @media (max-width: 480px) {
                .employee-container {
                    padding: 0 10px;
                }
    
                .search-bar-container {
                    padding: 10px;
                    flex-direction: column;
                }
    
                .employee-header {
                    padding: 10px;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 8px;
                }
    
                th, td {
                    padding: 4px;
                    font-size: 12px;
                }
    
                .list-view,
                .pagination-container button {
                    font-size: 12px;
                    padding: 8px;
                }
    
                .actions button {
                    font-size: 14px;
                }
            }
        `;
    }
    static get properties() {
        return {
            /**
             * The employee array
             * @type {Array}
             */
            employees: {type: Array},
    
            /**
             * The current page
             * @type {Number}
             */
            currentPage: {type: Number},

            /**
             * The items per page
             * @type {Number}
             */
            itemsPerPage: {type: Number},

            /**
             * The total items
             * @type {Number}
             */
            totalItems: {type: Number},

            /**
             * Flag for data presentation
             * @type {Boolean}
             */
            isTableView: {type: Boolean},

            /**
             * The search term
             * @type {String}
             */
            searchTerm: {type: String},

            /**
             * The selected employee info
             * @type {Object}
             */
            selectedEmployee: {type: Object},

            /**
             * Flag for open modal
             * @type {Boolean}
             */
            isDialogOpen: {type: Boolean}

        };
      }

      constructor() {
        super();
        this.employees = Array(891).fill().map((_, index) => ({
            id: index + 1,
            firstName: 'Ahmet',
            lastName: 'Sourtimes',
            dateOfEmployment: '23/09/2022',
            dateOfBirth: '23/09/2022',
            phone: '+(90) 532 123 45 67',
            email: 'ahmet@sourtimes.org',
            department: 'Analytics',
            position: 'Junior',
        }));
        this.currentPage = 1;
        this.itemsPerPage = 9;
        this.totalItems = this.employees.length;
        this.isTableView = true;
        this.searchTerm = "";
        this.selectedEmployee = null;
        this.isDialogOpen = false;

        store.subscribe(() => {
            const state = store.getState();
            this.employees = state && state.employee && state.employee.employees;
        });
      }

        connectedCallback() {
            super.connectedCallback();
            this.unsubscribe = store.subscribe(() => {
                const state = store.getState();
                this.employees = state.employees.list;
                this.selectedEmployee = state.employees.selectedEmployee;                
                this.requestUpdate();
            });
        }

        disconnectedCallback() {
            if (this.unsubscribe) {
                this.unsubscribe();
            }
            super.disconnectedCallback();
        }

        addEmployeeToList(event) {
            const newEmployee = {
                ...event.detail,
                id: generateNewId()
            };
            this.employees = [...this.employees, newEmployee];
            this.requestUpdate();
          }

          get paginatedEmployees() {
            const employees = this.employees || [];
        
            const filteredEmployees = !this.searchTerm
                ? employees
                : employees.filter(employee =>
                    Object.values(employee).some(value =>
                        String(value).toLowerCase().includes(this.searchTerm.toLowerCase())
                    )
                );
        
            const calculatedTotalPages = Math.ceil(filteredEmployees.length / this.itemsPerPage);
            this.totalPages = calculatedTotalPages;
        
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
        
            return filteredEmployees.slice(start, end);
        }

        openDeleteDialog(employee) {
            showConfirmDialog(
                localize("confirmDialogHeader"),
                localize("deleteConfirmationText", { firstName: employee.firstName, lastName: employee.lastName}),
                localize("proceedButtonText"),
                localize("cancelButtonText"),
                () => this.handleDeleteConfirmed(employee),
                () => this.handleDeleteCancelled()
            );
        }

        getDefaultEmployees() {
            return Array(891).fill().map((_, index) => ({
                id: index + 1, 
                firstName: 'Ahmet',
                lastName: 'Sourtimes',
                dateOfEmployment: '23/09/2022',
                dateOfBirth: '23/09/2022',
                phone: '+(90) 532 123 45 67',
                email: 'ahmet@sourtimes.org',
                department: 'Analytics',
                position: 'Junior',
            }));
        }

      render() {
        return html`
        <div class="employee-container">
            <home-button></home-button>
            <div class="search-bar-container">
                <input
                    type="text"
                    placeholder=${localize('placeholderSearch')}
                    @input="${this.handleSearch}"
                    .value="${this.searchTerm}"
                    class="search-bar"
                />
                <button class="add-new" @click="${() =>this.navigateToAddEmployee()}">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5V19" stroke="#ff6d00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M5 12H19" stroke="#ff6d00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    ${localize('addNewButtonText')}
                </button>
            </div>
            <div class="employee-header">
                <h2 class="header-text">${localize('employeeListHeader')}</h2>
                <div class="view-toggle">
                    <button @click="${() => this.isTableView = true}" class="${this.isTableView ? 'active' : ''}">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#ff6d00" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 6h16v2H4zM4 11h16v2H4zM4 16h16v2H4z"/>
                        </svg>
                    </button>
                    <button @click="${() => this.isTableView = false}" class="${!this.isTableView ? 'active' : ''}">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#ff6d00" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 4h5v5H4zM10 4h5v5h-5zM16 4h5v5h-5zM4 10h5v5H4zM10 10h5v5h-5zM16 10h5v5h-5zM4 16h5v5H4zM10 16h5v5h-5zM16 16h5v5h-5z"/>
                        </svg>                
                    </button>
                </div>
            </div>
            ${this.isTableView ? this.renderTableView() : this.renderListView()}
        </div>
        ${this.renderPaginationContainer()}
        `;
      }

      renderTableView() {
        const headers = [
            localize('labelFirstName'),
            localize('labelLastName'),
            localize('labelDateEmployment'),            
            localize('labelDateBirth'),
            localize('labelPhone'),
            localize('labelEmail'),
            localize('labelDepartment'),
            localize('labelPosition'),
            localize('labelActions'),
        ];
        const fields = [
            'firstName',
            'lastName',
            'dateOfEmployment',
            'dateOfBirth',
            'phone',
            'email',
            'department',
            'position'
        ];

        return html `
            <table>
                <thead>
                    <tr>
                        <th>
                            <input type="checkbox" @change="${this.toggleSelectAll}">
                        </th>
                        ${headers.map(header => html `<th class="field-text">${header}</th>`)}
                    </tr>
                </thead>
                <tbody>
                    ${repeat(this.paginatedEmployees, employee => employee.id, employee => html`
                        <tr>
                            <td>
                                <input
                                    type="checkbox"
                                    .checked="${employee.isSelected || false}"
                                    @change="${e => this.toggleSelectEmployee(e, employee.id)}"
                                >
                            </td>
                            ${fields.map(field => html`<td>${employee[field]}</td>`)}
                            <td class="actions">
                                <button @click="${() => this.handleEditClick(employee)}">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#ff6d00" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25z" />
                                        <path d="M17.71 6.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.996.996 0 00-1.41 0L13.46 4.5l3.75 3.75 1.5-1.5z" />
                                    </svg>
                                </button>
                                <button @click="${() => this.openDeleteDialog(employee)}">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM16 4l-1-1h-6l-1 1H5v2h14V4h-3z" fill="#ff6d00"/>
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    `)}
                </tbody>
            </table>
        `
      }

      renderListView() {
        const fields = [
            { label: localize('labelFirstName'), key: "firstName" },
            { label: localize('labelLastName'), key: "lastName" },
            { label: localize('labelDateEmployment'), key: "dateOfEmployment" },
            { label: localize('labelDateBirth'), key: "dateOfBirth" },
            { label: localize('labelPhone'), key: "phone" },
            { label: localize('labelEmail'), key: "email" },
            { label: localize('labelDepartment'), key: "department" },
            { label: localize('labelPosition'), key: "position" }
        ];
    
        return html `
            <div class="list-view">
                ${this.paginatedEmployees.map(employee => (html `
                    <div class="list-item">
                        <div class="employee-grid">
                            ${fields.map(field => html `
                                <div class="grid-item"><strong class="field-text-list">${field.label}: </strong>${employee[field.key]}</div>
                            `)}
                            <div class="actions table grid-item">
                                <button @click="${() => this.handleEditClick(employee)}">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#ff6d00" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25z" />
                                        <path d="M17.71 6.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.996.996 0 00-1.41 0L13.46 4.5l3.75 3.75 1.5-1.5z" />
                                    </svg>
                                </button>
                                <button @click="${() => this.openDeleteDialog(employee)}">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM16 4l-1-1h-6l-1 1H5v2h14V4h-3z" fill="#ff6d00"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                `))}
            </div>
        `
      }

      renderPaginationContainer() {
        const totalPages = this.totalPages;
        const currentPage = this.currentPage;

        const pageButtons = [];    

        for (let i = 1; i <= totalPages; i++) {
            if ( i === 1 || i === totalPages || (i >= currentPage -4 && i <= currentPage + 4)) {
                pageButtons.push(i);
            } else if ( 
                (i === currentPage - 5 && i > 1) || (i === currentPage + 5 && i < totalPages)
            ) {
                pageButtons.push('...');
            }
        }
        return html `
            <div class="pagination-container">
                <button class="arrow" @click="${() => this.handlePageChange(currentPage - 1)}" ?disabled="${currentPage === 1}">&lt;</button>
                ${pageButtons.map( page => 
                    page === '...' ? html `<span class="ellipsis">...</span>`
                    : html `
                    <button 
                        class="${page === currentPage ? 'active' : "" }"
                        @click= "${() => this.handlePageChange(page)}"
                    > ${page}</button>
                    `
                )}
                <button class="arrow" @click="${() => this.handlePageChange(currentPage + 1)}" ?disabled="${currentPage === totalPages}">&gt;</button>
            </div>
        `
      }

      toggleSelectAll(event) {
            const isChecked = event.target.checked;
            this.employees = this.employees.map(employee => ({
                ...employee,
                isSelected: isChecked
            }));
            this.requestUpdate();
        }

        toggleSelectEmployee(event, employee) {
            const updatedEmployees = this.employees.map(emp =>
                emp === employee ? { ...emp, isSelected: event.target.checked } : emp
            );
            this.employees = updatedEmployees;
            this.requestUpdate();    
        }

        handleSearch(event) {
            this.searchTerm = event.target.value;
        }

        toggleView() {
            this.isTableView = !this.isTableView;
        }

        handlePageChange (page) {
            if (page >= 1 || page <= this.totalPages) {
                this.currentPage = page;
                this.dispatchEvent(new CustomEvent('page-changed', { detail: {page: this.currentPage}}))
            }
        }

        navigateToAddEmployee() {
            store.dispatch(clearSelectedEmployee());
            this.selectedEmployee = null; 
            this.formType = 'add';     
            window.history.pushState({}, '', '/dev/employees/new');
            window.dispatchEvent(new PopStateEvent('popstate'));
        }   

  
        handleEditClick(employee) {
            store.dispatch(selectEmployeeForEdit(employee));
            window.history.pushState({}, '', '/dev/employees/edit');
            window.dispatchEvent(new PopStateEvent('popstate'));
        }

        handleDeleteConfirmed() {
            if (this.selectedEmployee) {
            store.dispatch(deleteEmployee(this.selectedEmployee.id));
        
            store.dispatch(clearSelectedEmployee());
        
            this.isDialogOpen = false;
            this.selectedEmployee = null;
            
            this.requestUpdate();
            }
        }

        handleDeleteCancelled() {
            this.isDialogOpen = false;
            this.selectedEmployee = null;
            this.requestUpdate();
        }
}

window.customElements.define('employee-list', EmployeeList);