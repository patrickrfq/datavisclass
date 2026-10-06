function criarBarras(vl, dados) {
  return vl.markBar({color: '#236c9c', cornerRadiusEnd: 3})
    .data(dados)
    .transform(vl.calculate("datum.Workout_Type === 'Yoga' ? 'Ioga' : datum.Workout_Type === 'Cardio' ? 'Cardiorrespiratório' : datum.Workout_Type === 'Strength' ? 'Treino de força' : 'Intervalado de alta intensidade'").as('Tipo_de_treino'))
    .encode(
      vl.y().fieldN('Tipo_de_treino')
        .sort({field: 'Calories_Burned', op: 'mean', order: 'ascending'})
        .title('Tipo de treino').axis({labelAngle: 0}),
      vl.x().fieldQ('Calories_Burned').aggregate('mean')
        .title('Média de calorias queimadas (kcal)').scale({zero: true}),
      vl.tooltip([
        {field: 'Tipo_de_treino', type: 'nominal', title: 'Tipo de treino'},
        {field: 'Calories_Burned', type: 'quantitative', aggregate: 'mean', title: 'Média (kcal)', format: '.2f'},
        {aggregate: 'count', type: 'quantitative', title: 'Indivíduos'}
      ])
    )
    .width(550).height(280)
    .title('Calorias queimadas por tipo de treino');
}

function criarDispersao(vl, dados) {
  return vl.markCircle({size: 12, opacity: 0.12, color: '#236c9c'})
    .data(dados)
    .transform(
      vl.filter({field: 'Gender', oneOf: ['Male', 'Female']}),
      vl.calculate("datum.Gender === 'Male' ? 'Homens' : 'Mulheres'").as('Genero'),
      vl.calculate("datum.Workout_Type === 'Yoga' ? 'Ioga' : datum.Workout_Type === 'Cardio' ? 'Cardiorrespiratório' : datum.Workout_Type === 'Strength' ? 'Treino de força' : 'Intervalado de alta intensidade'").as('Tipo_de_treino')
    )
    .encode(
      vl.x().fieldQ('Session_Duration (hours)').title('Duração da sessão (horas)')
        .scale({domain: [0, 2.2]}),
      vl.y().fieldQ('Calories_Burned').title('Calorias queimadas (kcal)')
        .scale({domain: [0, 3200]}),
      vl.column().fieldN('Genero').sort(['Homens', 'Mulheres']).title(null)
        .header({labelFontSize: 16}),
      vl.tooltip([
        {field: 'Session_Duration (hours)', type: 'quantitative', title: 'Duração (horas)', format: '.2f'},
        {field: 'Calories_Burned', type: 'quantitative', title: 'Calorias (kcal)', format: '.2f'},
        {field: 'Tipo_de_treino', type: 'nominal', title: 'Tipo de treino'}
      ])
    )
    .width(360).height(330)
    .title('Duração da sessão e calorias queimadas, por gênero');
}

