# Dynamic Grid Generator

A modern, interactive web application that allows users to create and manipulate dynamic grid layouts with a beautiful and intuitive user interface.

## 🚀 Features

- **Dynamic Grid Creation**: Create grids of any size with customizable rows and columns
- **Interactive Controls**:
  - Add rows and columns with "+" buttons
  - Remove rows and columns with "-" buttons
  - Hover-sensitive controls that appear when needed
- **Responsive Design**: Clean and modern UI with smooth animations
- **Smart Button Positioning**: Buttons automatically position themselves based on user interaction
- **Performance Optimized**: Includes throttling for smooth mouse movement handling

## 🛠️ Technical Implementation

### Core Components

- **Square Class**: Main constructor that handles grid creation and manipulation
- **Grid System**: Built using CSS Grid for precise layout control
- **Event Handling**: Sophisticated mouse event system for button positioning and visibility
- **Performance Features**:
  - Throttled event handlers for smooth performance
  - Optimized DOM manipulation
  - Smart visibility toggling for UI elements

### Key Features

1. **Dynamic Grid Management**

   - Automatic grid recalculation on size changes
   - Smart button positioning based on mouse position
   - Minimum size constraints (1x1 grid)

2. **UI/UX Features**

   - Smooth transitions and animations
   - Intuitive button placement
   - Clear visual feedback for user actions
   - Hover-sensitive controls

3. **Technical Highlights**
   - Pure JavaScript implementation
   - No external dependencies
   - Modern CSS features
   - Performance-optimized event handling

## 🎨 Styling

The application features a clean, modern design with:

- Consistent color scheme
- Smooth transitions
- Responsive layout
- Clear visual hierarchy
- User-friendly controls

## 🚀 Getting Started

1. Clone the repository
2. Open `index.html` in your browser
3. Start creating and manipulating grids!

## 💻 Usage

```javascript
// Create a new grid with 4 rows and 4 columns
new Square(4, 4);

// Create a larger grid with 7 rows and 7 columns
new Square(7, 7);

// Create a 9x9 grid
new Square(9, 9);
```

## 🛠️ Technical Details

### Constants

- Block Size: 50px
- Border Size: 1px
- Container Padding: 1px

### Event Handling

- Mouse movement tracking
- Click events for adding/removing rows and columns
- Hover events for button visibility
- Throttled event handlers for performance

### CSS Features

- CSS Grid for layout
- Flexbox for button positioning
- CSS transitions for smooth animations
- Modern box-sizing model

## 📝 License

This project is open source and available under the MIT License.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
