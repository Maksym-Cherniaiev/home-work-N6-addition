document.getElementById("get-full-data").addEventListener("click", getData);
document.getElementById("get-one-employee").addEventListener("click", getData);
document.getElementById("clear-list").addEventListener("click", removeDataFromList);
let idCounter = 0;
let buttonId = "btn-id_";

class GetData {
	constructor() {
		this.URL_SERVER = "http://dummy.restapiexample.com/api/v1/employees";
	}

	async employeeData() {
		const response = await fetch(this.URL_SERVER);
		const data = await response.json();
		return data;
	}
}

class PrintToPage extends GetData {
	constructor() {
		super();
		this.listContainer = document.querySelector(".employees-container");
		this.searchName = document.querySelector(".search-employee__input").value;
		this.employeeList = document.querySelector(".employees-container__list");
		this.detailsButtonClass = "list__button";
		this.handleDetailsButtonClick = this.handleDetailsButtonClick.bind(this);
		this.clickedButton = this.employeeList.addEventListener("click", this.handleDetailsButtonClick);
		this.getEmployeeByName();
	}

	handleDetailsButtonClick(event) {
		const target = this.getEventTarget(event);
		if (target.classList.contains(this.detailsButtonClass)) {
			return target.closest(".employees-container__list-element").classList.toggle("employees-container__list-element--active");
		}
	}

	getEventTarget(e) {
  		e = e || window.event;
  		return e.target || e.srcElement;
	}

	async getEmployeeByName() {
		const data = await this.employeeData();
		data.forEach(employee => {
			const name = employee.employee_name;
			if (name.toLowerCase().includes(this.searchName)) {
				this.createListElement(name);
			}
		});
	}

	createListElement(employee) {
		const employeeElement = document.createElement("li");
		employeeElement.classList.add("employees-container__list-element");

		const employeeName = document.createElement("p");
		employeeName.textContent = employee;

		const employeeDetails = document.createElement("button");
		employeeDetails.textContent = "details";
		employeeDetails.classList.add(this.detailsButtonClass);
		employeeDetails.id = `${this.createId(buttonId)}`

		employeeElement.appendChild(employeeName);
		employeeElement.appendChild(employeeDetails);
		this.employeeList.appendChild(employeeElement);
		this.listContainer.classList.add("employees-container--visible");
	}

	createId(elem) {
		idCounter++;
		return elem + idCounter;
	}

	clearPage() {

	}
}

function getData() {
	new PrintToPage();
}

function removeDataFromList() {

}