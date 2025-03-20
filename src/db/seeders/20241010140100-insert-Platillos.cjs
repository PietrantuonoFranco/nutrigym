'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Platillos', [

      //Dieta para perdidad de peso
     // Dieta sin restricciones
    { nombre: 'Avena con fresas y almendras', turno: 'desayuno' },
    { nombre: 'Tostada integral con aguacate y huevo', turno: 'desayuno' },
    { nombre: 'Omelette de claras con espinacas', turno: 'desayuno' },
    { nombre: 'Yogur griego con moras y nueces', turno: 'desayuno' },
    { nombre: 'Smoothie verde de espinacas y manzana', turno: 'desayuno' },
    { nombre: 'Frutas frescas con chía', turno: 'desayuno' },
    { nombre: 'Pan integral con queso cottage', turno: 'desayuno' },
    // Almuerzo
    { nombre: 'Pechuga de pollo con ensalada mixta', turno: 'almuerzo' },
    { nombre: 'Pescado al vapor con brócoli', turno: 'almuerzo' },
    { nombre: 'Ensalada de atún y vegetales', turno: 'almuerzo' },
    { nombre: 'Quinoa con pimientos y espárragos', turno: 'almuerzo' },
    { nombre: 'Tortilla de espinaca y champiñones', turno: 'almuerzo' },
    { nombre: 'Carne magra con ensalada de lechuga y tomate', turno: 'almuerzo' },
    { nombre: 'Vegetales al vapor con tofu', turno: 'almuerzo' },
    // Merienda
    { nombre: 'Manzana con almendras', turno: 'merienda' },
    { nombre: 'Yogur griego con frutos rojos', turno: 'merienda' },
    { nombre: 'Palitos de zanahoria y apio con hummus', turno: 'merienda' },
    { nombre: 'Frutas frescas', turno: 'merienda' },
    { nombre: 'Té verde y una banana', turno: 'merienda' },
    { nombre: 'Pepino con hummus', turno: 'merienda' },
    { nombre: 'Batido de proteína', turno: 'merienda' },
    // Cena
    { nombre: 'Pollo a la plancha con espárragos', turno: 'cena' },
    { nombre: 'Caldo de verduras con pollo', turno: 'cena' },
    { nombre: 'Pescado con ensalada verde', turno: 'cena' },
    { nombre: 'Tofu salteado con espinaca', turno: 'cena' },
    { nombre: 'Brócoli con champiñones al vapor', turno: 'cena' },
    { nombre: 'Calabacín relleno de carne magra', turno: 'cena' },
    { nombre: 'Sopa de vegetales', turno: 'cena' },


    // Dieta para veganos
    { nombre: 'Avena con chía y frutas', turno: 'desayuno' },
    { nombre: 'Tostadas integrales con aguacate', turno: 'desayuno' },
    { nombre: 'Smoothie de espinacas y frutas', turno: 'desayuno' },
    { nombre: 'Frutas frescas con semillas', turno: 'desayuno' },
    { nombre: 'Batido de proteína vegana', turno: 'desayuno' },
    { nombre: 'Pan integral con hummus', turno: 'desayuno' },
    { nombre: 'Yogur de coco con frutos rojos', turno: 'desayuno' },
    // Almuerzo
    { nombre: 'Quinoa con espinacas y garbanzos', turno: 'almuerzo' },
    { nombre: 'Tofu con batatas al horno', turno: 'almuerzo' },
    { nombre: 'Hamburguesa de lentejas con ensalada', turno: 'almuerzo' },
    { nombre: 'Ensalada de garbanzos y espinacas', turno: 'almuerzo' },
    { nombre: 'Bowl de quinoa y vegetales', turno: 'almuerzo' },
    { nombre: 'Curry de garbanzos y espinacas', turno: 'almuerzo' },
    { nombre: 'Verduras al vapor con hummus', turno: 'almuerzo' },
    // Merienda
    { nombre: 'Frutas frescas con almendras', turno: 'merienda' },
    { nombre: 'Batido de frutas', turno: 'merienda' },
    { nombre: 'Yogur de coco con fresas', turno: 'merienda' },
    { nombre: 'Palitos de zanahoria y apio con hummus', turno: 'merienda' },
    { nombre: 'Té verde y banana', turno: 'merienda' },
    { nombre: 'Frutos secos y moras', turno: 'merienda' },
    { nombre: 'Barra de proteína vegana', turno: 'merienda' },
    // Cena
    { nombre: 'Tofu salteado con espinaca y pimientos', turno: 'cena' },
    { nombre: 'Sopa de vegetales', turno: 'cena' },
    { nombre: 'Calabacín relleno de quinoa', turno: 'cena' },
    { nombre: 'Ensalada de espinacas y zanahorias', turno: 'cena' },
    { nombre: 'Quinoa con brócoli y champiñones', turno: 'cena' },
    { nombre: 'Guiso de garbanzos y espinacas', turno: 'cena' },
    { nombre: 'Verduras al horno', turno: 'cena' },
     // Dieta para celíacos
    { nombre: 'Avena sin gluten con plátano', turno: 'desayuno' },
    { nombre: 'Tostadas sin gluten con tomate y aguacate', turno: 'desayuno' },
    { nombre: 'Smoothie de frutas y espinacas', turno: 'desayuno' },
    { nombre: 'Yogur natural sin gluten con moras', turno: 'desayuno' },
    { nombre: 'Huevo con espinacas y pan sin gluten', turno: 'desayuno' },
    { nombre: 'Tortilla de verduras', turno: 'desayuno' },
    { nombre: 'Pan sin gluten con mantequilla de almendra', turno: 'desayuno' },
    // Almuerzo
    { nombre: 'Pechuga de pollo con batata y brócoli', turno: 'almuerzo' },
    { nombre: 'Ensalada de quinoa y vegetales', turno: 'almuerzo' },
    { nombre: 'Pescado con espárragos', turno: 'almuerzo' },
    { nombre: 'Carne magra con vegetales', turno: 'almuerzo' },
    { nombre: 'Lentejas con espinacas', turno: 'almuerzo' },
    { nombre: 'Pollo al horno con calabacín', turno: 'almuerzo' },
    { nombre: 'Tofu con zanahorias y espárragos', turno: 'almuerzo' },
    // Merienda
    { nombre: 'Manzana con nueces', turno: 'merienda' },
    { nombre: 'Yogur sin gluten con chía', turno: 'merienda' },
    { nombre: 'Pepino con hummus', turno: 'merienda' },
    { nombre: 'Frutas frescas', turno: 'merienda' },
    { nombre: 'Palitos de apio y zanahoria', turno: 'merienda' },
    { nombre: 'Almendras con fresas', turno: 'merienda' },
    { nombre: 'Batido de proteína sin gluten', turno: 'merienda' },
    // Cena
    { nombre: 'Caldo de pollo con espinacas', turno: 'cena' },
    { nombre: 'Ensalada de atún y pepino', turno: 'cena' },
    { nombre: 'Tofu con vegetales al vapor', turno: 'cena' },
    { nombre: 'Pescado con batatas', turno: 'cena' },
    { nombre: 'Ensalada verde con quinoa', turno: 'cena' },
    { nombre: 'Sopa de vegetales', turno: 'cena' },
    { nombre: 'Brochetas de pollo y verduras', turno: 'cena' },
    //Dieta para Ganancia de musculo
    // Dieta sin restricciones
    { nombre: 'Avena con frutas y nueces', turno: 'desayuno' },
    { nombre: 'Panqueques de plátano y huevo', turno: 'desayuno' },
    { nombre: 'Tostadas con aguacate y huevo', turno: 'desayuno' },
    { nombre: 'Smoothie de leche, avena y frutas', turno: 'desayuno' },
    { nombre: 'Omelette de espinaca y tomate', turno: 'desayuno' },
    { nombre: 'Tostadas integrales con mantequilla de maní', turno: 'desayuno' },
    { nombre: 'Yogur griego con frutos secos', turno: 'desayuno' },
    // Almuerzo
    { nombre: 'Arroz con pollo y brócoli', turno: 'almuerzo' },
    { nombre: 'Pasta con carne de res y espinaca', turno: 'almuerzo' },
    { nombre: 'Quinoa con atún y vegetales', turno: 'almuerzo' },
    { nombre: 'Pechuga de pollo con arroz integral', turno: 'almuerzo' },
    { nombre: 'Ensalada de garbanzos con aguacate y tomate', turno: 'almuerzo' },
    { nombre: 'Carne de cerdo con batatas asadas', turno: 'almuerzo' },
    { nombre: 'Pescado con papas y espinacas', turno: 'almuerzo' },
    // Merienda
    { nombre: 'Manzana con mantequilla de almendra', turno: 'merienda' },
    { nombre: 'Yogur con semillas de chía y banana', turno: 'merienda' },
    { nombre: 'Smoothie de frutas y avena', turno: 'merienda' },
    { nombre: 'Frutos secos con frutas deshidratadas', turno: 'merienda' },
    { nombre: 'Pan integral con aguacate y tomate', turno: 'merienda' },
    { nombre: 'Yogur con frutos secos', turno: 'merienda' },
    { nombre: 'Barra de proteína de cacahuate', turno: 'merienda' },
    // Cena
    { nombre: 'Pescado a la plancha con espárragos', turno: 'cena' },
    { nombre: 'Tortilla de espinaca y queso', turno: 'cena' },
    { nombre: 'Pollo con verduras salteadas', turno: 'cena' },
    { nombre: 'Atún con ensalada de lechuga y tomate', turno: 'cena' },
    { nombre: 'Brochetas de carne y vegetales', turno: 'cena' },
    { nombre: 'Sopa de verduras con carne', turno: 'cena' },
    { nombre: 'Batata rellena con carne de res', turno: 'cena' },

    // Dieta para veganos
    { nombre: 'Avena con frutas y semillas', turno: 'desayuno' },
    { nombre: 'Smoothie de plátano y espinaca', turno: 'desayuno' },
    { nombre: 'Tostadas con aguacate y tomate', turno: 'desayuno' },
    { nombre: 'Frutas con chía y linaza', turno: 'desayuno' },
    { nombre: 'Batido de proteína vegetal', turno: 'desayuno' },
    { nombre: 'Pan integral con mantequilla de almendra', turno: 'desayuno' },
    { nombre: 'Yogur de coco con frutas', turno: 'desayuno' },
    // Almuerzo
    { nombre: 'Quinoa con garbanzos y espinaca', turno: 'almuerzo' },
    { nombre: 'Lentejas con batatas', turno: 'almuerzo' },
    { nombre: 'Tofu con arroz integral', turno: 'almuerzo' },
    { nombre: 'Ensalada de frijoles y aguacate', turno: 'almuerzo' },
    { nombre: 'Pasta de lentejas con espinacas', turno: 'almuerzo' },
    { nombre: 'Hamburguesa de frijoles con batatas', turno: 'almuerzo' },
    { nombre: 'Curry de garbanzos y quinoa', turno: 'almuerzo' },
    // Merienda
    { nombre: 'Frutos secos y frutas frescas', turno: 'merienda' },
    { nombre: 'Yogur de coco con granola', turno: 'merienda' },
    { nombre: 'Smoothie de proteína vegana', turno: 'merienda' },
    { nombre: 'Pan integral con hummus', turno: 'merienda' },
    { nombre: 'Frutas frescas con chía', turno: 'merienda' },
    { nombre: 'Barra de proteína vegana', turno: 'merienda' },
    { nombre: 'Mix de frutos secos y semillas', turno: 'merienda' },
    // Cena
    { nombre: 'Tofu con brócoli y batatas', turno: 'cena' },
    { nombre: 'Guiso de lentejas y espinacas', turno: 'cena' },
    { nombre: 'Ensalada de quinoa con vegetales', turno: 'cena' },
    { nombre: 'Hamburguesa de garbanzos y vegetales', turno: 'cena' },
    { nombre: 'Sopa de vegetales', turno: 'cena' },
    { nombre: 'Curry de tofu y espinacas', turno: 'cena' },
    { nombre: 'Arroz integral con verduras', turno: 'cena' },
     // Dieta para celíacos
    { nombre: 'Avena sin gluten con frutas', turno: 'desayuno' },
    { nombre: 'Tostadas sin gluten con aguacate', turno: 'desayuno' },
    { nombre: 'Omelette con vegetales', turno: 'desayuno' },
    { nombre: 'Smoothie de frutas y almendras', turno: 'desayuno' },
    { nombre: 'Huevo con pan sin gluten', turno: 'desayuno' },
    { nombre: 'Yogur natural con frutos secos', turno: 'desayuno' },
    { nombre: 'Pancakes de harina de almendra', turno: 'desayuno' },
    // Almuerzo
    { nombre: 'Pollo a la plancha con arroz integral', turno: 'almuerzo' },
    { nombre: 'Pescado con batatas al horno', turno: 'almuerzo' },
    { nombre: 'Ensalada de quinoa y aguacate', turno: 'almuerzo' },
    { nombre: 'Carne de res con vegetales', turno: 'almuerzo' },
    { nombre: 'Quinoa con pollo y brócoli', turno: 'almuerzo' },
    { nombre: 'Tortilla de espinacas y champiñones', turno: 'almuerzo' },
    { nombre: 'Lentejas con zanahorias y pimientos', turno: 'almuerzo' },
    // Merienda
    { nombre: 'Nueces y frutas frescas', turno: 'merienda' },
    { nombre: 'Manzana con almendras', turno: 'merienda' },
    { nombre: 'Smoothie de frutas sin gluten', turno: 'merienda' },
    { nombre: 'Barra de proteína sin gluten', turno: 'merienda' },
    { nombre: 'Yogur natural sin gluten', turno: 'merienda' },
    { nombre: 'Tostadas de arroz con mantequilla de almendra', turno: 'merienda' },
    { nombre: 'Frutas frescas y chía', turno: 'merienda' },
    // Cena
    { nombre: 'Pollo con espárragos', turno: 'cena' },
    { nombre: 'Tortilla de patatas', turno: 'cena' },
    { nombre: 'Pescado a la plancha con brócoli', turno: 'cena' },
    { nombre: 'Quinoa con verduras', turno: 'cena' },
    { nombre: 'Pollo a la parrilla con espinaca', turno: 'cena' },
    { nombre: 'Sopa de verduras', turno: 'cena' },
    { nombre: 'Batatas con carne', turno: 'cena' },
    //Dieta para mantenimiento
    // Dieta sin restricciones
    { nombre: 'Omelette de espinaca y tomate', turno: 'desayuno' },
    { nombre: 'Tostada integral con aguacate y huevo', turno: 'desayuno' },
    { nombre: 'Avena con frutas y semillas', turno: 'desayuno' },
    { nombre: 'Yogur griego con miel y nueces', turno: 'desayuno' },
    { nombre: 'Batido de plátano y proteína', turno: 'desayuno' },
    { nombre: 'Pancakes integrales con frutas', turno: 'desayuno' },
    { nombre: 'Frutas frescas y almendras', turno: 'desayuno' },
    // Almuerzo
    { nombre: 'Pollo a la plancha con quinoa y espárragos', turno: 'almuerzo' },
    { nombre: 'Salmón con batata y brócoli', turno: 'almuerzo' },
    { nombre: 'Carne de res magra con ensalada mixta', turno: 'almuerzo' },
    { nombre: 'Pechuga de pavo con arroz integral y vegetales', turno: 'almuerzo' },
    { nombre: 'Tofu con fideos de arroz y verduras', turno: 'almuerzo' },
    { nombre: 'Ensalada de atún con garbanzos y tomate', turno: 'almuerzo' },
    { nombre: 'Pasta integral con pimientos y pollo', turno: 'almuerzo' },
    // Merienda
    { nombre: 'Frutos secos variados', turno: 'merienda' },
    { nombre: 'Yogur natural con frutas', turno: 'merienda' },
    { nombre: 'Batido de proteína con fresas', turno: 'merienda' },
    { nombre: 'Palitos de zanahoria y hummus', turno: 'merienda' },
    { nombre: 'Manzana con mantequilla de almendras', turno: 'merienda' },
    { nombre: 'Pepino y pimientos con guacamole', turno: 'merienda' },
    { nombre: 'Frutas frescas con queso cottage', turno: 'merienda' },
    // Cena
    { nombre: 'Pescado al horno con espinaca', turno: 'cena' },
    { nombre: 'Ensalada César con pollo', turno: 'cena' },
    { nombre: 'Tortilla de vegetales y queso bajo en grasa', turno: 'cena' },
    { nombre: 'Pechuga de pollo con puré de calabaza', turno: 'cena' },
    { nombre: 'Vegetales salteados con tofu', turno: 'cena' },
    { nombre: 'Brócoli con espárragos y salmón', turno: 'cena' },
    { nombre: 'Sopa de calabacín con pollo desmenuzado', turno: 'cena' },

    // Dieta para veganos
    { nombre: 'Avena con fresas y semillas de chía', turno: 'desayuno' },
    { nombre: 'Tostadas de aguacate y tomate', turno: 'desayuno' },
    { nombre: 'Smoothie verde de espinacas y plátano', turno: 'desayuno' },
    { nombre: 'Yogur de coco con frutos rojos', turno: 'desayuno' },
    { nombre: 'Batido de proteína vegana y moras', turno: 'desayuno' },
    { nombre: 'Frutas frescas con almendras', turno: 'desayuno' },
    { nombre: 'Pan integral vegano con hummus', turno: 'desayuno' },
    // Almuerzo
    { nombre: 'Tofu con quinoa y espárragos', turno: 'almuerzo' },
    { nombre: 'Ensalada de garbanzos con espinaca', turno: 'almuerzo' },
    { nombre: 'Lentejas con calabacín y zanahoria', turno: 'almuerzo' },
    { nombre: 'Vegetales al horno con garbanzos', turno: 'almuerzo' },
    { nombre: 'Bowl de quinoa con espinaca', turno: 'almuerzo' },
    { nombre: 'Fideos de arroz con tofu', turno: 'almuerzo' },
    { nombre: 'Bowl de arroz integral con pimientos', turno: 'almuerzo' },
    // Merienda
    { nombre: 'Frutas con nueces', turno: 'merienda' },
    { nombre: 'Batido de proteína vegana', turno: 'merienda' },
    { nombre: 'Té verde y almendras', turno: 'merienda' },
    { nombre: 'Pepino con hummus', turno: 'merienda' },
    { nombre: 'Barra de proteína vegana', turno: 'merienda' },
    { nombre: 'Frutas frescas con semillas de calabaza', turno: 'merienda' },
    { nombre: 'Palitos de zanahoria y hummus', turno: 'merienda' },
    // Cena
    { nombre: 'Caldo de verduras con tofu', turno: 'cena' },
    { nombre: 'Ensalada de rúcula y espárragos', turno: 'cena' },
    { nombre: 'Sopa de brócoli con zanahorias', turno: 'cena' },
    { nombre: 'Calabacín al horno con garbanzos', turno: 'cena' },
    { nombre: 'Quinoa con espárragos', turno: 'cena' },
    { nombre: 'Verduras asadas con tofu', turno: 'cena' },
    { nombre: 'Brócoli y espinacas con hummus', turno: 'cena' },
     // Dieta para celíacos
    { nombre: 'Avena sin gluten con frutas y chía', turno: 'desayuno' },
    { nombre: 'Tostadas sin gluten con aguacate', turno: 'desayuno' },
    { nombre: 'Huevos revueltos con espinacas', turno: 'desayuno' },
    { nombre: 'Yogur natural sin gluten con fresas', turno: 'desayuno' },
    { nombre: 'Smoothie de moras y chía', turno: 'desayuno' },
    { nombre: 'Frutas frescas con semillas de calabaza', turno: 'desayuno' },
    { nombre: 'Pan sin gluten con hummus y tomate', turno: 'desayuno' },
    // Almuerzo
    { nombre: 'Pollo al horno con calabacín y pimientos', turno: 'almuerzo' },
    { nombre: 'Salmón con arroz integral y espinaca', turno: 'almuerzo' },
    { nombre: 'Carne magra con batata y ensalada', turno: 'almuerzo' },
    { nombre: 'Ensalada de quinoa con verduras asadas', turno: 'almuerzo' },
    { nombre: 'Tofu con verduras al horno', turno: 'almuerzo' },
    { nombre: 'Pollo a la plancha con pimientos y espinaca', turno: 'almuerzo' },
    { nombre: 'Pavo con ensalada de espinaca y zanahoria', turno: 'almuerzo' },
    // Merienda
    { nombre: 'Manzana con nueces', turno: 'merienda' },
    { nombre: 'Yogur sin gluten con frambuesas', turno: 'merienda' },
    { nombre: 'Té verde con almendras', turno: 'merienda' },
    { nombre: 'Pepino y zanahorias con hummus', turno: 'merienda' },
    { nombre: 'Batido de proteína sin gluten', turno: 'merienda' },
    { nombre: 'Frutas frescas con chía', turno: 'merienda' },
    { nombre: 'Arándanos y almendras', turno: 'merienda' },
    // Cena
    { nombre: 'Ensalada de pepino, lechuga y pavo', turno: 'cena' },
    { nombre: 'Pescado al horno con espárragos', turno: 'cena' },
    { nombre: 'Caldo de verduras con tofu', turno: 'cena' },
    { nombre: 'Brócoli y pimientos con quinoa', turno: 'cena' },
    { nombre: 'Tofu con calabacín asado', turno: 'cena' },
    { nombre: 'Sopa de calabaza con espinacas', turno: 'cena' },
    { nombre: 'Ensalada de rúcula con pimientos', turno: 'cena' },

], {});

    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Comidas', null, {});
    }
};