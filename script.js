// Daily Planner JavaScript
class DailyPlanner {
    constructor() {
        this.tasks = this.loadTasks();
        this.currentFilter = 'all';
        this.editingTaskId = null;
        
        this.initializeElements();
        this.bindEvents();
        this.updateCurrentDate();
        this.renderTasks();
        this.updateStats();
    }

    initializeElements() {
        // Form elements
        this.taskForm = document.getElementById('task-form');
        this.taskTitle = document.getElementById('task-title');
        this.taskDescription = document.getElementById('task-description');
        this.taskTime = document.getElementById('task-time');
        this.taskPriority = document.getElementById('task-priority');
        this.addTaskBtn = document.getElementById('add-task-btn');

        // Display elements
        this.tasksContainer = document.getElementById('tasks-container');
        this.noTasksMessage = document.getElementById('no-tasks-message');
        this.currentDateElement = document.getElementById('current-date');

        // Filter elements
        this.filterButtons = document.querySelectorAll('.filter-btn');

        // Stats elements
        this.totalTasksElement = document.getElementById('total-tasks');
        this.completedTasksElement = document.getElementById('completed-tasks');
        this.pendingTasksElement = document.getElementById('pending-tasks');

        // Template
        this.taskTemplate = document.getElementById('task-template');
    }

    bindEvents() {
        // Form submission
        this.taskForm.addEventListener('submit', (e) => this.handleFormSubmit(e));

        // Filter buttons
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFilterChange(e));
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        const title = this.taskTitle.value.trim();
        const description = this.taskDescription.value.trim();
        const time = this.taskTime.value;
        const priority = this.taskPriority.value;

        if (!title) {
            this.showNotification('Please enter a task title', 'error');
            return;
        }

        if (this.editingTaskId) {
            this.updateTask(this.editingTaskId, { title, description, time, priority });
            this.editingTaskId = null;
            this.addTaskBtn.textContent = 'Add Task';
        } else {
            this.addTask({ title, description, time, priority });
        }

        this.resetForm();
        this.showNotification('Task saved successfully!', 'success');
    }

    addTask(taskData) {
        const task = {
            id: this.generateId(),
            title: taskData.title,
            description: taskData.description,
            time: taskData.time,
            priority: taskData.priority,
            completed: false,
            createdAt: new Date().toISOString(),
            completedAt: null
        };

        this.tasks.push(task);
        this.saveTasks();
        this.renderTasks();
        this.updateStats();
    }

    updateTask(taskId, updates) {
        const taskIndex = this.tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
            this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updates };
            this.saveTasks();
            this.renderTasks();
            this.updateStats();
        }
    }

    deleteTask(taskId) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.tasks = this.tasks.filter(task => task.id !== taskId);
            this.saveTasks();
            this.renderTasks();
            this.updateStats();
            this.showNotification('Task deleted successfully!', 'success');
        }
    }

    toggleTaskComplete(taskId) {
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            task.completed = !task.completed;
            task.completedAt = task.completed ? new Date().toISOString() : null;
            this.saveTasks();
            this.renderTasks();
            this.updateStats();
            
            const message = task.completed ? 'Task completed!' : 'Task marked as pending';
            this.showNotification(message, 'success');
        }
    }

    editTask(taskId) {
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            this.taskTitle.value = task.title;
            this.taskDescription.value = task.description;
            this.taskTime.value = task.time;
            this.taskPriority.value = task.priority;
            
            this.editingTaskId = taskId;
            this.addTaskBtn.textContent = 'Update Task';
            this.taskTitle.focus();
            
            // Scroll to form
            this.taskForm.scrollIntoView({ behavior: 'smooth' });
        }
    }

    handleFilterChange(e) {
        const filter = e.target.dataset.filter;
        this.currentFilter = filter;
        
        // Update active button
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        this.renderTasks();
    }

    handleKeyboardShortcuts(e) {
        // Ctrl/Cmd + Enter to submit form
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            if (document.activeElement.closest('#task-form')) {
                this.taskForm.dispatchEvent(new Event('submit'));
            }
        }
        
        // Escape to cancel editing
        if (e.key === 'Escape' && this.editingTaskId) {
            this.cancelEdit();
        }
    }

    cancelEdit() {
        this.editingTaskId = null;
        this.addTaskBtn.textContent = 'Add Task';
        this.resetForm();
    }

    renderTasks() {
        const filteredTasks = this.getFilteredTasks();
        
        if (filteredTasks.length === 0) {
            this.tasksContainer.innerHTML = '<div id="no-tasks-message" class="no-tasks"><p>No tasks found. Add a task to get started!</p></div>';
            return;
        }

        // Sort tasks by time, then by priority
        const sortedTasks = filteredTasks.sort((a, b) => {
            // Completed tasks go to bottom
            if (a.completed !== b.completed) {
                return a.completed ? 1 : -1;
            }
            
            // Sort by time if both have time
            if (a.time && b.time) {
                return a.time.localeCompare(b.time);
            }
            
            // Tasks with time come first
            if (a.time && !b.time) return -1;
            if (!a.time && b.time) return 1;
            
            // Sort by priority
            const priorityOrder = { high: 0, medium: 1, low: 2 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });

        this.tasksContainer.innerHTML = '';
        
        sortedTasks.forEach(task => {
            const taskElement = this.createTaskElement(task);
            this.tasksContainer.appendChild(taskElement);
        });
    }

    createTaskElement(task) {
        const template = this.taskTemplate.content.cloneNode(true);
        const taskElement = template.querySelector('.task-item');
        
        // Set task data
        taskElement.dataset.taskId = task.id;
        taskElement.classList.toggle('completed', task.completed);
        
        // Fill content
        taskElement.querySelector('.task-title').textContent = task.title;
        taskElement.querySelector('.task-description').textContent = task.description || 'No description';
        taskElement.querySelector('.task-priority').textContent = task.priority;
        taskElement.querySelector('.task-priority').className = `task-priority ${task.priority}`;
        
        // Format time
        const timeElement = taskElement.querySelector('.task-time');
        if (task.time) {
            const formattedTime = this.formatTime(task.time);
            timeElement.textContent = `⏰ ${formattedTime}`;
        } else {
            timeElement.textContent = '⏰ No time set';
        }
        
        // Status
        const statusElement = taskElement.querySelector('.task-status');
        statusElement.textContent = task.completed ? '✅ Completed' : '⏳ Pending';
        
        // Bind action buttons
        const completeBtn = taskElement.querySelector('.complete-btn');
        const editBtn = taskElement.querySelector('.edit-btn');
        const deleteBtn = taskElement.querySelector('.delete-btn');
        
        completeBtn.addEventListener('click', () => this.toggleTaskComplete(task.id));
        editBtn.addEventListener('click', () => this.editTask(task.id));
        deleteBtn.addEventListener('click', () => this.deleteTask(task.id));
        
        // Update button text for completed tasks
        if (task.completed) {
            completeBtn.textContent = '↶';
            completeBtn.title = 'Mark as pending';
        }
        
        // Add animation
        taskElement.classList.add('fade-in');
        
        return taskElement;
    }

    getFilteredTasks() {
        switch (this.currentFilter) {
            case 'completed':
                return this.tasks.filter(task => task.completed);
            case 'pending':
                return this.tasks.filter(task => !task.completed);
            default:
                return this.tasks;
        }
    }

    updateStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(task => task.completed).length;
        const pending = total - completed;
        
        this.totalTasksElement.textContent = total;
        this.completedTasksElement.textContent = completed;
        this.pendingTasksElement.textContent = pending;
    }

    updateCurrentDate() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        this.currentDateElement.textContent = now.toLocaleDateString('en-US', options);
    }

    formatTime(timeString) {
        if (!timeString) return '';
        
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        
        return `${displayHour}:${minutes} ${ampm}`;
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    resetForm() {
        this.taskForm.reset();
        this.taskTitle.focus();
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '10px',
            color: 'white',
            fontWeight: '600',
            zIndex: '1000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            maxWidth: '300px',
            wordWrap: 'break-word'
        });
        
        // Set background color based on type
        const colors = {
            success: '#48bb78',
            error: '#f56565',
            info: '#4299e1'
        };
        notification.style.backgroundColor = colors[type] || colors.info;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Local Storage Methods
    saveTasks() {
        try {
            localStorage.setItem('dailyPlannerTasks', JSON.stringify(this.tasks));
        } catch (error) {
            console.error('Failed to save tasks to localStorage:', error);
            this.showNotification('Failed to save tasks', 'error');
        }
    }

    loadTasks() {
        try {
            const saved = localStorage.getItem('dailyPlannerTasks');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Failed to load tasks from localStorage:', error);
            return [];
        }
    }

    // Export/Import functionality
    exportTasks() {
        const dataStr = JSON.stringify(this.tasks, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `daily-planner-tasks-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        this.showNotification('Tasks exported successfully!', 'success');
    }

    importTasks(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedTasks = JSON.parse(e.target.result);
                if (Array.isArray(importedTasks)) {
                    this.tasks = importedTasks;
                    this.saveTasks();
                    this.renderTasks();
                    this.updateStats();
                    this.showNotification('Tasks imported successfully!', 'success');
                } else {
                    throw new Error('Invalid file format');
                }
            } catch (error) {
                this.showNotification('Failed to import tasks. Invalid file format.', 'error');
            }
        };
        reader.readAsText(file);
    }

    // Clear all tasks
    clearAllTasks() {
        if (confirm('Are you sure you want to delete all tasks? This action cannot be undone.')) {
            this.tasks = [];
            this.saveTasks();
            this.renderTasks();
            this.updateStats();
            this.showNotification('All tasks cleared!', 'success');
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.dailyPlanner = new DailyPlanner();
    
    // Add some helpful keyboard shortcuts info
    console.log('Daily Planner Keyboard Shortcuts:');
    console.log('- Ctrl/Cmd + Enter: Submit form');
    console.log('- Escape: Cancel editing');
    
    // Add export/import buttons dynamically (optional enhancement)
    const addExtraFeatures = () => {
        const tasksHeader = document.querySelector('.tasks-header');
        if (tasksHeader) {
            const extraButtons = document.createElement('div');
            extraButtons.className = 'extra-buttons';
            extraButtons.style.display = 'flex';
            extraButtons.style.gap = '0.5rem';
            extraButtons.style.marginTop = '1rem';
            
            // Export button
            const exportBtn = document.createElement('button');
            exportBtn.textContent = 'Export';
            exportBtn.className = 'filter-btn';
            exportBtn.addEventListener('click', () => window.dailyPlanner.exportTasks());
            
            // Import button
            const importBtn = document.createElement('button');
            importBtn.textContent = 'Import';
            importBtn.className = 'filter-btn';
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = '.json';
            fileInput.style.display = 'none';
            fileInput.addEventListener('change', (e) => {
                if (e.target.files[0]) {
                    window.dailyPlanner.importTasks(e.target.files[0]);
                }
            });
            importBtn.addEventListener('click', () => fileInput.click());
            
            // Clear button
            const clearBtn = document.createElement('button');
            clearBtn.textContent = 'Clear All';
            clearBtn.className = 'filter-btn';
            clearBtn.style.background = '#f56565';
            clearBtn.style.color = 'white';
            clearBtn.addEventListener('click', () => window.dailyPlanner.clearAllTasks());
            
            extraButtons.appendChild(exportBtn);
            extraButtons.appendChild(importBtn);
            extraButtons.appendChild(fileInput);
            extraButtons.appendChild(clearBtn);
            
            tasksHeader.appendChild(extraButtons);
        }
    };
    
    // Add extra features after a short delay
    setTimeout(addExtraFeatures, 100);
});

