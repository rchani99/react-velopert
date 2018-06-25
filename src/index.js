import React from 'react';
import { render } from 'react-dom';
import ReactDOMFactories from 'react-dom-factories';
import App from './App';

render(<App />, document.getElementById('root'));

/* React로 Element 생성하기  */

const dish = React.createElement(
  'h1',
  { id: 'recipe-0', 'data-type': 'title' },
  '구운 연어'
);

render(dish, document.getElementById('root'));
console.log('dish', dish);

/* 외부의 데이터로 자식 Element 만들기, 동시에 Array의 map 사용하기 */

const items = [
  '연어 500그램',
  '버터 10그램',
  '마늘 1 숟가락',
  '밀가루 1 숟가락',
  '사랑 한스푼'
];

const ingredients = React.createElement(
  'ul',
  { className: 'ingredients' },
  items.map((ingredient, idx) =>
    React.createElement('li', { key: idx }, ingredient)
  )
);

render(ingredients, document.getElementById('root'));
console.log('ingredients', ingredients);

/* 컴포넌트 만들기1 > React.createClass - 향후 지원 안함 */
/* 컴포넌트 만들기2 > React.Component 상속 */
class IngredientsList extends React.Component {
  renderListItem(ingredient, i) {
    return React.createElement('li', { key: i }, ingredient);
  }

  render() {
    return React.createElement(
      'ul',
      { className: 'ingredients' },
      this.props.items.map(this.renderListItem)
    );
  }
}

render(
  React.createElement(IngredientsList, { items }, null),
  document.getElementById('root')
);

console.log('IngredientsList with React.Component', IngredientsList);

/* 컴포넌트 만들기3 > 상태가 없는 함수형 컨포넌트 만들기 */
const IngredientsListWithFn = ({ items }) =>
  React.createElement(
    'ul',
    { className: 'ingredients' },
    items.map((ingredient, idx) =>
      React.createElement('li', { key: idx }, ingredient)
    )
  );

console.log(
  'IngredientsListWithFn with stateless funtion',
  IngredientsListWithFn
);

/* 팩토리 사용하기 */
ReactDOMFactories.h1(null, 'Baked Salmon');
var list = ReactDOMFactories.ul(
  { className: 'ingredients' },
  ReactDOMFactories.li(null, '연어 500그램'),
  ReactDOMFactories.li(null, '잣 1컵'),
  ReactDOMFactories.li(null, '버터 1스푼')
);
render(list, document.getElementById('root'));

/* 팩토리 사용하기 with map */
var list = ReactDOMFactories.ul(
  { className: 'ingredients' },
  items.map((ingredients, key) => ReactDOMFactories.li({ key }, ingredients))
);

render(list, document.getElementById('root'));

/* 팩토리와 컴포넌트 함께 사용하기 */
const newItems = ['사랑', '감사', '꿈', '즐거움'];

const ingredientsListWithFactory = ({ newItems }) =>
  React.createElement(
    'ul',
    null,
    newItems.map((ingredient, idx) =>
      React.createElement('li', { key: idx }, ingredient)
    )
  );

const ingredientFactory = React.createFactory(ingredientsListWithFactory);

render(ingredientFactory({ newItems }), document.getElementById('root'));

/* 레시피 앱 */
const data = [
  {
    name: 'Baked Salmon',
    ingredients: [
      { name: 'Salmon', amount: 1, measurement: 'l lb' },
      { name: 'Pine Nuts', amount: 1, measurement: 'cup' },
      { name: 'Butter Lettuce', amount: 2, measurement: 'cups' },
      { name: 'Yellow Squash', amount: 1, measurement: 'med' },
      { name: 'Olive Oil', amount: 0.5, measurement: 'cup' },
      { name: 'Garlic', amount: 3, measurement: 'cloves' }
    ],
    steps: [
      'Preheat the oven to 350 degrees.',
      'Spread the olive oil around a glass baking dish.',
      'Add the salmon, garlic, and pine nuts to the dish.',
      'Bake for 15 minutes.',
      'Add the yellow squash and put back in the oven for 30 mins.',
      'Remove from oven and let cool for 15 minutes. Add the lettuce and serve.'
    ]
  },
  {
    name: 'Fish Tacos',
    ingredients: [
      { name: 'Whitefish', amount: 1, measurement: 'l lb' },
      { name: 'Cheese', amount: 1, measurement: 'cup' },
      { name: 'Iceberg Lettuce', amount: 2, measurement: 'cups' },
      { name: 'Tomatoes', amount: 2, measurement: 'large' },
      { name: 'Tortillas', amount: 3, measurement: 'med' }
    ],
    steps: [
      'Cook the fish on the grill until hot.',
      'Place the fish on the 3 tortillas.',
      'Top them with lettuce, tomatoes, and cheese'
    ]
  }
];

const Menu = ({ title, recipes }) => (
  <article>
    <header>
      <h1>{title}</h1>
    </header>
    <div className="recipes">
      {recipes.map((recipe, i) => <Recipe key={i} {...recipe} />)}
    </div>
  </article>
);

const Recipe = ({ name, ingredients, steps }) => (
  <section id={name.toLowerCase().replace(/ /g, '-')}>
    <h1>{name}</h1>
    <ul className="ingredients">
      {ingredients.map((ingredient, i) => <li key={i}>{ingredient.name}</li>)}
    </ul>
    <section className="instructions">
      <h2>조리 절차</h2>
      {steps.map((step, i) => <p key={i}>{step}</p>)}
    </section>
  </section>
);

render(
  <Menu recipes={data} title="맛있는 조리법" />,
  document.getElementById('root')
);
