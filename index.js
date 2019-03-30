document.getElementById("get-full-data").addEventListener("click", getAllData);
document.getElementById("get-one-employee").addEventListener("click", getDataByName);
document.getElementById("clear-list").addEventListener("click", removeDataFromList);

let idCounter = 0;
let buttonId = "btn-id_";

class GetData {
	constructor() {
		this.URL_SERVER = "https://jsonplaceholder.typicode.com/users";
		this.arrOfEmployee = [];
	}

	async employeeData() {
		const response = await fetch(this.URL_SERVER);
		this.data = await response.json();
		this.arrOfEmployee = this.data;
		return this.arrOfEmployee;
	}
}

class PrintOnPage extends GetData {
	constructor() {
		super();
		this.listContainer = document.querySelector(".employees-container");
		this.searchName = document.querySelector(".search-employee__input").value;
		this.employeeList = document.querySelector(".employees-container__list");
		this.detailsButtonClass = "list__button";
		this.employeeName = "list__employee-name";
		this.emptyFile = "Employee not found";
		this.createsParagraph = this.createsParagraph.bind(this);
		this.addCreatedElementsToList = this.addCreatedElementsToList.bind(this);
		this.detailsButtonModifier = this.detailsButtonModifier.bind(this);
		this.employeeList.addEventListener("click", this.detailsButtonModifier);
	}

	detailsButtonModifier(event) {
		if (event.target.classList.contains(this.detailsButtonClass)) {
			event.target.closest(".employees-container__list-element").classList.toggle("employees-container__list-element--active");
		}
		return event.target;
	}

	async getEmployeeByName() {
		await this.employeeData();
		console.log(this.arrOfEmployee);
		if (this.searchName === "") {
			this.addCreatedElementsToList(this.createsParagraph(this.emptyFile), undefined);
		} else {
			this.arrOfEmployee.forEach(employee => {
				const name = employee.name;
				if (name.toLowerCase().includes(this.searchName.toLowerCase())) {
					this.addCreatedElementsToList(this.createsParagraph(name), this.createsButtonDetails());
				}
			});
		}
		return this.arrOfEmployee;
	}

	createsListItem() {
		const employeeElement = document.createElement("li");
		employeeElement.classList.add("employees-container__list-element");
		return employeeElement;
	}

	createsParagraph(employee) {
		const employeeName = document.createElement("p");
		employeeName.classList.add(this.employeeName);
		employeeName.textContent = employee;
		return employeeName;
	}

	createId(elem) {
		idCounter++;
		return elem + idCounter;
	}

	createsButtonDetails() {
		const employeeDetails = document.createElement("button");
		employeeDetails.textContent = "details";
		employeeDetails.classList.add(this.detailsButtonClass);
		employeeDetails.id = `${this.createId(buttonId)}`
		return employeeDetails;
	}

	addCreatedElementsToList(paragraph, button) {
		const resultList = this.createsListItem();
		if (paragraph !== undefined) {
			resultList.appendChild(paragraph);
		} if (button !== undefined) {
			resultList.appendChild(button);
		}
		this.employeeList.appendChild(resultList);
		return this.employeeList;
	}
}

class Remover extends PrintOnPage {
	constructor() {
		super();
		this.clearPage();
	}

	clearPage() {
		while (this.employeeList.firstChild) {
			this.employeeList.removeChild(this.employeeList.firstChild);
		}
	}
}

function getAllData() {

}

function getDataByName() {
	const newSearch = new PrintOnPage();
	newSearch.getEmployeeByName();
}

function removeDataFromList() {
	new Remover();
}