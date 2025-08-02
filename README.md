# DailyPlanner-App


# Daily Planner Website

A beautiful, responsive daily planner website built with HTML, CSS, and JavaScript. This application helps you organize your daily tasks with an intuitive interface and powerful features.

## Features

### ✨ Core Functionality
- **Add Tasks**: Create new tasks with title, description, time, and priority
- **Edit Tasks**: Modify existing tasks by clicking the edit button
- **Complete Tasks**: Mark tasks as completed with visual feedback
- **Delete Tasks**: Remove tasks you no longer need
- **Filter Tasks**: View all, pending, or completed tasks
- **Statistics**: Real-time stats showing total, completed, and pending tasks

### 🎨 Design Features
- **Modern UI**: Clean, professional design with gradient backgrounds
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Smooth Animations**: Hover effects, transitions, and micro-interactions
- **Priority System**: Color-coded priority levels (High, Medium, Low)
- **Time Management**: Schedule tasks with specific times
- **Visual Feedback**: Notifications for user actions

### 💾 Data Management
- **Local Storage**: Tasks are automatically saved to your browser
- **Export/Import**: Backup and restore your tasks as JSON files
- **Persistent Data**: Your tasks remain even after closing the browser

## Files Structure

```
daily-planner/
├── index.html          # Main HTML structure
├── style.css           # CSS styling and responsive design
├── script.js           # JavaScript functionality
└── README.md           # This documentation file
```

## How to Use

### Getting Started
1. Open `index.html` in any modern web browser
2. The current date will be displayed at the top
3. Start adding your first task using the form on the left

### Adding a Task
1. Enter a task title (required)
2. Add a description (optional)
3. Set a time (optional)
4. Choose priority level (Low, Medium, High)
5. Click "Add Task"

### Managing Tasks
- **Complete**: Click the ✓ button to mark as completed
- **Edit**: Click the ✎ button to modify the task
- **Delete**: Click the ✗ button to remove the task
- **Filter**: Use the filter buttons to view specific task types

### Keyboard Shortcuts
- **Ctrl/Cmd + Enter**: Submit the current form
- **Escape**: Cancel editing mode

### Export/Import
- **Export**: Click "Export" to download your tasks as a JSON file
- **Import**: Click "Import" to load tasks from a JSON file
- **Clear All**: Remove all tasks (with confirmation)

## Browser Compatibility

This application works in all modern browsers:
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Technical Details

### Technologies Used
- **HTML5**: Semantic markup and modern features
- **CSS3**: Flexbox, Grid, animations, and responsive design
- **Vanilla JavaScript**: ES6+ features, local storage, and DOM manipulation

### Key Features Implementation
- **Responsive Design**: CSS Grid and Flexbox for layout
- **Local Storage**: Automatic saving and loading of tasks
- **Task Management**: Object-oriented JavaScript class structure
- **Filtering**: Dynamic task filtering with visual feedback
- **Animations**: CSS transitions and JavaScript-triggered animations

### Performance Optimizations
- **Efficient DOM Updates**: Minimal reflows and repaints
- **Event Delegation**: Optimized event handling
- **Local Storage**: Client-side data persistence
- **Responsive Images**: Optimized for different screen sizes

## Customization

### Changing Colors
Edit the CSS variables in `style.css`:
```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --success-color: #48bb78;
  --warning-color: #dd6b20;
  --danger-color: #f56565;
}
```

### Adding New Features
The JavaScript code is modular and well-commented. You can easily extend functionality by:
1. Adding new methods to the `DailyPlanner` class
2. Creating new HTML elements and styling them
3. Implementing additional task properties or filters

## Troubleshooting

### Tasks Not Saving
- Ensure your browser supports local storage
- Check if you're in private/incognito mode
- Clear browser cache and try again

### Layout Issues
- Ensure you're using a modern browser
- Check if JavaScript is enabled
- Verify all files are in the same directory

### Performance Issues
- Clear browser cache
- Close other browser tabs
- Restart the browser

## Future Enhancements

Potential features that could be added:
- **Calendar Integration**: Monthly/weekly view
- **Task Categories**: Organize tasks by categories
- **Reminders**: Browser notifications for scheduled tasks
- **Collaboration**: Share tasks with others
- **Dark Mode**: Toggle between light and dark themes
- **Task Templates**: Reusable task templates
- **Search**: Find tasks by keywords
- **Drag & Drop**: Reorder tasks by dragging

## License

This project is open source and available under the MIT License.

## Support

For questions or issues:
1. Check the troubleshooting section above
2. Ensure all files are properly downloaded
3. Verify browser compatibility
4. Check browser console for error messages

---

**Enjoy organizing your daily tasks with this beautiful planner!** 🎯

## 🚀 Live Demo

🌐 [Click here to try the Daily Planner](https://idyllic-paprenjak-5c2fc4.netlify.app)


