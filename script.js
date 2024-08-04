document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const studentTable = document.getElementById('studentTable').getElementsByTagName('tbody')[0];
    let studentData = JSON.parse(localStorage.getItem('studentData')) || [];
    let editIndex = -1;

    // Initial table update
    updateTable();

    // Form submission handler
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const className = document.getElementById('class').value.trim();
        const Rol_No = document.getElementById('Roll_No').value.trim();
        const address = document.getElementById('address').value.trim();
        const contact = document.getElementById('contact').value.trim();

        if (!validateInputs(name, className, Rol_No, address, contact)) return;

        if (editIndex === -1) {
            studentData.push({ name, className,Rol_No, address, contact });
        } else {
            studentData[editIndex] = { name, className,Rol_No, address, contact };
            editIndex = -1;
        }

        form.reset();
        updateTable();
        saveToLocalStorage();
    });

    function validateInputs(name, className, Rol_No, address, contact) {
        // Validate name (only letters and spaces)
        if (!/^[a-zA-Z\s]+$/.test(name)) {
            alert('Name should only contain letters and spaces.');
            return false;
        }

        // Validate class (only numbers)
        if (!/^\d+$/.test(className)) {
            alert('Class should only contain numbers.');
            return false;
        }

        // Validate Roll_No (can be any number)

        if (!/^\d+$/.test(Rol_No)) {
            alert('Roll_No: number should only contain numbers.');
            return false;
        }

        // Validate address (can be any text)
        if (address === '') {
            alert('Address cannot be empty.');
            return false;
        }

        // Validate contact (only numbers)
        if (!/^\d+$/.test(contact)) {
            alert('Contact number should only contain numbers.');
            return false;
        }

        return true;
    }

    function updateTable() {
        studentTable.innerHTML = '';

        studentData.forEach((student, index) => {
            const row = studentTable.insertRow();
            
            row.insertCell(0).textContent = student.name;
            row.insertCell(1).textContent = student.className;
            row.insertCell(2).textContent = student.Rol_No;
            row.insertCell(3).textContent = student.address;
            row.insertCell(4).textContent = student.contact;
            
            const actionsCell = row.insertCell(5);

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.className = 'edit';
            editButton.addEventListener('click', () => editRecord(index));
            actionsCell.appendChild(editButton);
            
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'delete';
            deleteButton.addEventListener('click', () => deleteRecord(index));
            actionsCell.appendChild(deleteButton);
        });

        // Add scrollbar if needed
        studentTable.parentElement.style.overflowY = studentTable.scrollHeight > studentTable.parentElement.clientHeight ? 'auto' : 'hidden';
    }

    function editRecord(index) {
        document.getElementById('name').value = studentData[index].name;
        document.getElementById('class').value = studentData[index].className;
        document.getElementById('Roll_No').value = studentData[index].Rol_No;
        document.getElementById('address').value = studentData[index].address;
        document.getElementById('contact').value = studentData[index].contact;
        
        editIndex = index;
    }

    function deleteRecord(index) {
        studentData.splice(index, 1);
        updateTable();
        saveToLocalStorage();
    }

    function saveToLocalStorage() {
        localStorage.setItem('studentData', JSON.stringify(studentData));
    }
});
