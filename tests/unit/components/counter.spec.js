import { shallowMount } from '@vue/test-utils';
import Counter from '@/components/Counter';

describe('Counter Component', () => {
  //   test('Debe hacer match con el snapshot', () => {
    //     const wrapper = shallowMount(Counter);
    // // esta ayuda a no tener que hacer muchas pruebas, porque tiene que coincidir:
    //     expect(wrapper.html()).toMatchSnapshot();
  //   });

  let wrapper

  beforeEach(()=>{
    // Counter es el componente
    wrapper= shallowMount(Counter) // si viene información en las props desde otro componente, aquí no se van a ver
  })

  test('h2 tiene que tener el valor por defecto "Counter"', () => {

    expect(wrapper.find('h2').exists()).toBeTruthy(); // si no es truthy no sigue
    const h2Value = wrapper.find('h2').text(); // si hay que buscar más de uno, findAll
    expect(h2Value).toBe('Counter');
  });

  test('el valor por defecto debe ser de 100 en el p', () => {
    // const pTags = wrapper.findAll('p'); // saca las dos etiquetas P que tengo
    const pTag = wrapper.find('[data-testid="counter"]').text(); // buscamos por atributo que le hemos puesto a la etiqueta para que sea unico
    //console.log(pTag); // saca 100 string
    expect(pTag).toBe('100'); // tipo y valor tienen que ser iguales ===. queremos la posicion segunda del array porque es el que queremos comprobar
  });
  
  test('el valor debe aumentar y disminur el counter', async () => { // incluimos async para que realice primero el click y luego realice el test
    // const increaseBtn = wrapper.find('button');
    // const decreaseBtn = wrapper.findAll('button')[1];

    const [increaseBtn, decreaseBtn] = wrapper.findAll('button'); // desestructurar array

    await increaseBtn.trigger('click'); // trigger dispara el evento click
    await increaseBtn.trigger('click'); 
    await increaseBtn.trigger('click'); 

    await decreaseBtn.trigger('click');
    await decreaseBtn.trigger('click');
    const value = wrapper.find('[data-testid="counter"]').text();
    expect(value).toBe('101');
  });

  test('Debe establecer el valor por defecto', ()=>{
    // para leer las props:
    const{ start } = (wrapper.props())
    // otra manera de hacerlo es const value = (wrapper.props('start'))
    console.log(typeof start)
    const value = wrapper.find('[data-testid="counter"]').text()
    expect( Number(value)).toBe( start )
  })

  test('Debe mostrar la prop title', ()=>{
    const title = 'Hola Mundo'
    // Como solo queremos utilizar las props aquí, creamos un nuevo wrapper
    wrapper= shallowMount(Counter , {
      props:{
        title, // aqui le pasamos la constante (podríamos ponerla aquí directamente). También podemos meter aquí la prop start y comprobar que le pasamos un Number
      
      }
    })
    expect( wrapper.find ('h2').text() ). toBe (title)
  })
});
