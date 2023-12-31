import Handlebars from 'handlebars';
export { default as ChatPage } from './chat.hbs?raw';


Handlebars.registerHelper('ListDialog', () => {
    return [
        { 
          title: 'White chat',
          avatar: 'man5',
          time: '16:38',
          subtitle: 'Друзья, у меня для вас особенный выпуск новостей, И Human Interface Guidelines и Material Design', 
          badge: '3'
        },
        { 
          title: 'Buy / Sell',
          avatar: 'man2',
          time: '11:22',
          subtitle: 'В своём стремлении повысить качество жизни, они забывают, что социально-экономическое развитие не оставляет шанса для стандартных подходов.', 
          badge: ''
        },
        { 
          title: 'Konstantin',
          avatar: 'man4',
          time: '23:10',
          subtitle: 'Высокий уровень вовлечения представителей целевой аудитории является четким доказательством простого факта: новая модель организационной деятельности предопределяет высокую востребованность экономической целесообразности принимаемых решений.', 
          badge: ''
        },
        { 
          title: 'SkyNet',
          avatar: 'man3',
          time: '06:12',
          subtitle: 'Однозначно, базовые сценарии поведения пользователей объединены в целые кластеры себе подобных.', 
          badge: '1'
        },
    ]
})

Handlebars.registerHelper('message', () => {
  return [
      { 
        type: '',
        text: 'Разнообразный и богатый опыт социально-экономическое развитие создаёт предпосылки качественно новых шагов для направлений прогрессивного развития? Дорогие друзья, новая модель организационной деятельности напрямую зависит от направлений прогрессивного развития. Не следует, однако, забывать о том, что повышение уровня гражданского сознания требует от нас системного анализа экономической целесообразности принимаемых решений! Таким образом, постоянный...',
        img: ''
      },
      { 
        type: 'send',
        text: 'Задача организации, в особенности же рамки и место обучения кадров...',
        img: ''
      },
      { 
        type: 'message-img send',
        img: 'img1.jpg'
      },
      { 
        type: 'message-img',
        img: 'img2.jpg'
      },
  ]
})
