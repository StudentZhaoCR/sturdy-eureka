document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    const sidebarItems = document.querySelectorAll('.sidebar ul li');
    sidebarItems.forEach(item => {
        const link = item.querySelector('a').getAttribute('href');
        if (link === '#' || link === currentPage || (currentPage === '' && link === 'device.html')) {
            item.classList.add('active');
        }
        item.addEventListener('click', function() {
            sidebarItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Handle conversion form submission
    const conversionForm = document.getElementById('conversionForm');
    if (conversionForm) {
        conversionForm.addEventListener('submit', function(event) {
            event.preventDefault();
            addConversionRecord();
        });
    }

});

// Function to add a new conversion record
function addConversionRecord() {
    const deviceName = document.getElementById('deviceName').value;
    const softwareName = document.getElementById('softwareName').value;
    const gameName = document.getElementById('gameName').value;

    if (!deviceName || !softwareName || !gameName) {
        alert('请填写所有字段');
        return;
    }

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    const newRecord = {
        date: formattedDate,
        deviceName: deviceName,
        softwareName: softwareName,
        gameName: gameName,
        isConverted: false // Default to not converted
    };

    const records = JSON.parse(localStorage.getItem('conversionRecords')) || [];
    records.push(newRecord);
    localStorage.setItem('conversionRecords', JSON.stringify(records));

    // Clear form
    document.getElementById('conversionForm').reset();

    // Reload records table
    loadConversionRecords();
}

// Function to toggle conversion status
function toggleConversionStatus(index) {
    const records = JSON.parse(localStorage.getItem('conversionRecords')) || [];
    if (index >= 0 && index < records.length) {
        const record = records[index];
        if (!record.isConverted) {
            if (confirm('确定要将此记录标记为已转化吗？')) {
                record.isConverted = true;
                localStorage.setItem('conversionRecords', JSON.stringify(records));
                loadConversionRecords(); // Reload table to reflect changes
            }
        }
    }
}

// Function to delete a conversion record
function deleteConversionRecord(index) {
    const records = JSON.parse(localStorage.getItem('conversionRecords')) || [];
    if (index >= 0 && index < records.length) {
        if (confirm('确定要删除此记录吗？')) {
            records.splice(index, 1);
            localStorage.setItem('conversionRecords', JSON.stringify(records));
            loadConversionRecords(); // Reload table to reflect changes
        }
    }
}