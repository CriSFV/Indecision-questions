import { shallowMount } from '@vue/test-utils';
import Indecision from '@/components/Indecision';

describe('Indecion Component', ()=>{
    let wrapper
    let clgSpy
    let getAnswerSpy
    let input

    global.fetch = jest.fn(()=>Promise.resolve({
        json: ()=> Promise.resolve({
            'answer':'yes',
            'forced':false,
            'image':'https://yesno.wtf/assets/yes/2.gif'
        })
    }))
// para hacer test con axios:
//     import axios from 'axios';
 
// jest.mock('axios');
 
// const data = {
//       data: {
//         hits: [
//           {
//             objectID: '1',
//             title: 'a',
//           },
//           {
//             objectID: '2',
//             title: 'b',
//           },
//         ],
//       },
//     };
 
//     axios.get.mockImplementationOnce(() => Promise.resolve(data));

    beforeEach(()=>{
        wrapper= shallowMount(Indecision) 
        clgSpy = jest.spyOn(console, 'log') // console es el objeto y log es el objeto. Esta es una función espía
        getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer') // queremos ver que no sea llamado porque no se ha dado al "?". Con el vm llamamos como al DOM virtual... podemos utilizar tambien vm.$data(es un {} al que está observando Vue), vm.$props, vm.$el
        input = wrapper.find('input')
        jest.clearAllMocks() // esta linea es para que limpien las variables despues de un test
      })

    
    test('Debe hacer match con el snapshot', () => {   
        expect(wrapper.html()).toMatchSnapshot();
    });

    test('El input no debe disparar nada (console.log)', async ()=>{

        // con setValue le damos el valo
       await input.setValue('Hola Mundo')
       // esperamos que el spy sea llamado una vece
       expect(clgSpy).toHaveBeenCalledTimes(1)
       // comprobar que el getAnswer no hay sido disparado
       //expect( getAnswerSpy ).toHaveBeenCalledTimes(0)
       expect( getAnswerSpy ).not.toHaveBeenCalled() // esto es lo mismo que la línea anterior
    })

    test ('disparar fetch al escribir "?"', async ()=>{  
        await input.setValue('?')
        expect(getAnswerSpy).toHaveBeenCalledTimes(1)
    })
    test('pruegas en getAnswer', async()=>{
        await wrapper.vm.getAnswer()
        const img = wrapper.find('img')
        expect(img.exists()).toBeTruthy()
        expect(wrapper.vm.img).toBe('https://yesno.wtf/assets/yes/2.gif')
        expect(wrapper.vm.answer).toBe('Si!')
        console.log(wrapper.vm.img)
        console.log(wrapper.vm.answer)
    })
    test('pruebas en getAnswer - Fallo en API', async()=>{

        fetch.mockImplementationOnce(()=>Promise.reject('API is down')) // creamos error en api de manera manual
        await wrapper.vm.getAnswer()
        const img = wrapper.find('img')
        expect(img.exists()).toBeFalsy()
        expect(wrapper.vm.answer).toBe('No se pudo cargar la respuesta del API')

    })
}) 