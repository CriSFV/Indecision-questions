
// la principal es la prueba

describe('Example Component', () => {

  // estas son los test:

 
  test( 'Descripcion de la preba que se va a realizar, por ejemplo si el valor es correcto', ()=>{
      
    // Arreglar
    let value = 10;

    // Estímulo
    value = value+2

    // Observar resultado
    expect(value).toBeGreaterThan(10)

  } )

})