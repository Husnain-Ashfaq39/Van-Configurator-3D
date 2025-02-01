// productConfig.js
export const productConfig = {
   
    sliding_drawer: {
      modelPath: "/Sliding_Drawer.glb",
      scale: [0.35, 0.35, 0.35],
      initialPosition: [0, -0.8, 0],
      name: 'Sliding Drawer',
      price: 150,
      image: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      description: 'Sliding drawer',
      isFavorite: false,
      dimensions: { width: 0.35, height: 0.35, depth: 0.35 },
      vanBounds: { x: [-0.72, 0.72], z: [-2.6, 0.3] }
    },
    bunk: {
      modelPath: "/Bunk.glb",
      scale: [0.4, 0.4, 0.4],
      initialPosition: [0, -0.8, 0],
      name: 'Bunk',
      price: 350,
      image: 'https://example.com/bunk-image.jpg', 
      description: 'A comfortable bunk bed',
      isFavorite: false,
      dimensions: { width: 0.4, height: 0.4, depth: 0.4 },
      vanBounds: { x: [-0.4, 0.4], z: [-2.5, 0.5] }
    },
    double_table: {
      modelPath: "/Double_Table.glb",
      scale: [1, 1, 1],
      initialPosition: [0, -0.8, 0],
      name: 'Double Table',
      price: 250,
      image: 'https://example.com/double-table-image.jpg', // Replace with actual image URL
      description: 'A versatile double table',
      isFavorite: false,
      dimensions: { width: 1, height: 1, depth: 1 },
      vanBounds: { x: [-0.5, 0.5], z: [-1.5, 0.5] }
    },
    full_bed: {
      modelPath: "/Full-Bed.glb",
      scale: [0.57, 0.57, 0.57],
      initialPosition: [0, -0.8, 0],
      name: 'Full Bed',
      price: 500,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      description: 'Comfortable full-size bed',
      isFavorite: false,
      dimensions: { width: 0.57, height: 0.57, depth: 0.57 },
      vanBounds: { x: [-0.4, 0.4], z: [-2, 0] }
    },
    washroom: {
      modelPath: "/washroom2.glb",
      scale: [0.85, 0.85, 0.85],
      initialPosition: [0, -0.8, 0],
      name: 'Washroom',
      price: 400,
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      description: 'Compact unit',
      isFavorite: false,
      dimensions: { width: 0.85, height: 0.85, depth: 0.85 },
      vanBounds: { x: [-0.6, 0.6], z: [-2, 0] }
    },
    solar_panel: {
      modelPath: "/solar_panel.glb",
      scale: [0.003, 0.003, 0.003],
      initialPosition: [0, -0.8, 0],
      name: 'Solar Panel',
      price: 300,
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      description: 'Solar panel',
      isFavorite: false,
      dimensions: { width: 0.003, height: 0.003, depth: 0.003 },
      vanBounds: { x: [-0.1, 0.1], z: [-0.5, 0.5] }
    },
    simple_bed: {
      modelPath: "/Simple-Bed.glb",
      scale: [1.09, 1.09, 1.09],
      initialPosition: [0, -0.8, 0],
      name: 'Simple Bed',
      price: 250,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      description: 'A simple and comfortable bed',
      isFavorite: false,
      dimensions: { width: 1.09, height: 1.09, depth: 1.09 },
      vanBounds: { x: [-0.5, 0.5], z: [-2, 0] }
    },
    round_table: {
      modelPath: "/Round-Table.glb",
      scale: [1, 1, 1],
      initialPosition: [0, -0.8, 0],
      name: 'Round Table',
      price: 180,
      image: 'https://example.com/round-table-image.jpg',
      description: 'A stylish round table',
      isFavorite: false,
      dimensions: { width: 1, height: 1, depth: 1 },
      vanBounds: { x: [-0.3, 0.3], z: [-1.5, 0] }
    },
    sofa_set: {
      modelPath: "/sofa-set.glb",
      scale: [0.3, 0.3, 0.3],
      initialPosition: [0, -0.8, 0],
      name: 'Sofa Set',
      price: 600,
      image: 'https://example.com/sofa-set-image.jpg',
      description: 'A luxurious sofa set',
      isFavorite: false,
      dimensions: { width: 0.3, height: 0.3, depth: 0.3 },
      vanBounds: { x: [-0.35, 0.35], z: [-2, 0] }
    },
    kitchen: {
      modelPath: "/kitchen.glb",
      scale: [0.55, 0.55, 0.55],
      initialPosition: [0, -0.8, 0],
      name: 'Kitchen',
      price: 800,
      image: 'https://example.com/kitchen-image.jpg',
      description: 'A modern kitchen setup',
      isFavorite: false,
      dimensions: { width: 0.55, height: 0.55, depth: 0.55 },
      vanBounds: { x: [-0.4, 0.4], z: [-1.8, 0.2] }
    },
    sink_with_cabinet: {
      modelPath: "/SinkwithCabinet.glb",
      scale: [0.6, 0.6, 0.6],
      initialPosition: [0, -0.8, 0],
      name: 'Sink with Cabinet',
      price: 350,
      image: 'https://example.com/sink-with-cabinet-image.jpg',
      description: 'A sink with a cabinet for storage',
      isFavorite: false,
      dimensions: { width: 0.6, height: 0.6, depth: 0.6 },
      vanBounds: { x: [-0.5, 0.5], z: [-2, 0.1] }
    },
    gas_stove: {
      modelPath: "/Gas-Stove.glb",
      scale: [0.75, 0.75, 0.75],
      initialPosition: [0, -0.8, 0],
      name: 'Gas Stove With Oven',
      price: 400,
      image: 'https://example.com/gas-stove-image.jpg',
      description: 'A modern gas stove for cooking',
      isFavorite: false,
      dimensions: { width: 0.75, height: 0.75, depth: 0.75 },
      vanBounds: { x: [-0.45, 0.45], z: [-1.7, 0.3] }
    }
};