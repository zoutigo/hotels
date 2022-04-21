const houses = [
  {
    id: 1,
    name: 'Energie ',
    address: '114B route de cremieu',
    description: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras hendrerit lacinia purus dictum bibendum. Proin sed sagittis dolor. Maecenas quis fermentum est. Vivamus cursus massa id est sollicitudin condimentum. Mauris at lobortis enim. Quisque a metus nec erat dapibus efficitur. Aenean mollis, neque in sagittis posuere, sapien dolor placerat magna, sit amet tincidunt est lacus id lacus. Aliquam a mi eget erat convallis elementum. Praesent eu diam nec augue elementum ultricies quis non elit.
 
 Aliquam rutrum turpis ac ex fermentum venenatis. Nam eget elit ligula. Suspendisse euismod facilisis arcu, vehicula rutrum elit pellentesque sed. Etiam tellus libero, lacinia nec tristique eu, aliquet ut mauris. Aliquam dapibus convallis bibendum. Nam elementum lacus nunc, et rhoncus enim cursus ac. Nam velit ligula, vestibulum et ullamcorper ac, egestas nec lectus. Aenean dui lacus, blandit quis pellentesque vitae, hendrerit eget justo.
    `,
    image: 'landingbottom1.jpg',
    city: 'Madrid',
    slug: 'energie',
    suits: [
      {
        id: 1,
        price: 123,
        banner: 'landingbottom1.jpg',
        name: 'Pampa1',
        booking: 'http://booking/ets/1',
        description: `
         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras hendrerit lacinia purus dictum bibendum. Proin sed sagittis dolor. Maecenas quis fermentum est. Vivamus cursus massa id est sollicitudin condimentum. Mauris at lobortis enim. Quisque a metus nec erat dapibus efficitur. Aenean mollis, neque in sagittis posuere, sapien dolor placerat magna, sit amet tincidunt est lacus id lacus. Aliquam a mi eget erat convallis elementum. Praesent eu diam nec augue elementum ultricies quis non elit.
      
      Aliquam rutrum turpis ac ex fermentum venenatis. Nam eget elit ligula. Suspendisse euismod facilisis arcu, vehicula rutrum elit pellentesque sed. Etiam tellus libero, lacinia nec tristique eu, aliquet ut mauris. Aliquam dapibus convallis bibendum. Nam elementum lacus nunc, et rhoncus enim cursus ac. Nam velit ligula, vestibulum et ullamcorper ac, egestas nec lectus. Aenean dui lacus, blandit quis pellentesque vitae, hendrerit eget justo.
         `,
        images: [
          {
            alt: 'example',
            url: 'julie.jpg',
          },
          {
            alt: 'example',
            url: 'julie.jpg',
          },
          {
            alt: 'example',
            url: 'julie.jpg',
          },
          {
            alt: 'example',
            url: 'julie.jpg',
          },
        ],
      },
      {
        id: 2,
        price: 313,
        banner: 'landingbottom1.jpg',
        name: 'Pampa2',
        booking: 'http://booking/ets/1',
        description: `
         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras hendrerit lacinia purus dictum bibendum. Proin sed sagittis dolor. Maecenas quis fermentum est. Vivamus cursus massa id est sollicitudin condimentum. Mauris at lobortis enim. Quisque a metus nec erat dapibus efficitur. Aenean mollis, neque in sagittis posuere, sapien dolor placerat magna, sit amet tincidunt est lacus id lacus. Aliquam a mi eget erat convallis elementum. Praesent eu diam nec augue elementum ultricies quis non elit.
      
      Aliquam rutrum turpis ac ex fermentum venenatis. Nam eget elit ligula. Suspendisse euismod facilisis arcu, vehicula rutrum elit pellentesque sed. Etiam tellus libero, lacinia nec tristique eu, aliquet ut mauris. Aliquam dapibus convallis bibendum. Nam elementum lacus nunc, et rhoncus enim cursus ac. Nam velit ligula, vestibulum et ullamcorper ac, egestas nec lectus. Aenean dui lacus, blandit quis pellentesque vitae, hendrerit eget justo.
         `,
        images: [
          {
            alt: 'example',
            url: 'julie.jpg',
          },
          {
            alt: 'example',
            url: 'julie.jpg',
          },
          {
            alt: 'example',
            url: 'julie.jpg',
          },
          {
            alt: 'example',
            url: 'julie.jpg',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    address: '114B route de cremieu',
    name: 'Restauration',
    description:
      "l'approvisionnement se fait à moins de 40km de l'établissement.",
    image: 'landingbottom2.jpg',
    city: 'Madrid',
    slug: 'restauration',
    suits: [
      {
        id: 1,
        price: 123,
        banner: 'landingbottom1.jpg',
        name: 'Angry1',
        booking: 'http://booking/ets/1',
        description: `
           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras hendrerit lacinia purus dictum bibendum. Proin sed sagittis dolor. Maecenas quis fermentum est. Vivamus cursus massa id est sollicitudin condimentum. Mauris at lobortis enim. Quisque a metus nec erat dapibus efficitur. Aenean mollis, neque in sagittis posuere, sapien dolor placerat magna, sit amet tincidunt est lacus id lacus. Aliquam a mi eget erat convallis elementum. Praesent eu diam nec augue elementum ultricies quis non elit.
        
        Aliquam rutrum turpis ac ex fermentum venenatis. Nam eget elit ligula. Suspendisse euismod facilisis arcu, vehicula rutrum elit pellentesque sed. Etiam tellus libero, lacinia nec tristique eu, aliquet ut mauris. Aliquam dapibus convallis bibendum. Nam elementum lacus nunc, et rhoncus enim cursus ac. Nam velit ligula, vestibulum et ullamcorper ac, egestas nec lectus. Aenean dui lacus, blandit quis pellentesque vitae, hendrerit eget justo.
           `,
        images: [
          {
            alt: 'example',
            url: 'julie.jpg',
          },
          {
            alt: 'example',
            url: 'julie.jpg',
          },
          {
            alt: 'example',
            url: 'julie.jpg',
          },
          {
            alt: 'example',
            url: 'julie.jpg',
          },
        ],
      },
      {
        id: 2,
        price: 313,
        banner: 'landingbottom1.jpg',
        name: 'Angry2',
        booking: 'http://booking/ets/1',
        description: `
           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras hendrerit lacinia purus dictum bibendum. Proin sed sagittis dolor. Maecenas quis fermentum est. Vivamus cursus massa id est sollicitudin condimentum. Mauris at lobortis enim. Quisque a metus nec erat dapibus efficitur. Aenean mollis, neque in sagittis posuere, sapien dolor placerat magna, sit amet tincidunt est lacus id lacus. Aliquam a mi eget erat convallis elementum. Praesent eu diam nec augue elementum ultricies quis non elit.
        
        Aliquam rutrum turpis ac ex fermentum venenatis. Nam eget elit ligula. Suspendisse euismod facilisis arcu, vehicula rutrum elit pellentesque sed. Etiam tellus libero, lacinia nec tristique eu, aliquet ut mauris. Aliquam dapibus convallis bibendum. Nam elementum lacus nunc, et rhoncus enim cursus ac. Nam velit ligula, vestibulum et ullamcorper ac, egestas nec lectus. Aenean dui lacus, blandit quis pellentesque vitae, hendrerit eget justo.
           `,
        images: [
          {
            alt: 'example',
            url: 'julie.jpg',
          },
          {
            alt: 'example',
            url: 'julie.jpg',
          },
          {
            alt: 'example',
            url: 'julie.jpg',
          },
          {
            alt: 'example',
            url: 'julie.jpg',
          },
        ],
      },
    ],
  },
  {
    id: 3,
    address: '114B route de cremieu',
    name: 'Préservation .',
    description:
      "Tout au long de l'année, des équipes dédiés encadrent les activités",
    image: 'landingbottom3.jpg',
    city: 'Madrid',
    slug: 'preservation',
    suits: [
      {
        id: 1,
        price: 123,
        banner: 'landingbottom1.jpg',
        name: 'Bird1',
        booking: 'http://booking/ets/1',
        description: `
           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras hendrerit lacinia purus dictum bibendum. Proin sed sagittis dolor. Maecenas quis fermentum est. Vivamus cursus massa id est sollicitudin condimentum. Mauris at lobortis enim. Quisque a metus nec erat dapibus efficitur. Aenean mollis, neque in sagittis posuere, sapien dolor placerat magna, sit amet tincidunt est lacus id lacus. Aliquam a mi eget erat convallis elementum. Praesent eu diam nec augue elementum ultricies quis non elit.
        
        Aliquam rutrum turpis ac ex fermentum venenatis. Nam eget elit ligula. Suspendisse euismod facilisis arcu, vehicula rutrum elit pellentesque sed. Etiam tellus libero, lacinia nec tristique eu, aliquet ut mauris. Aliquam dapibus convallis bibendum. Nam elementum lacus nunc, et rhoncus enim cursus ac. Nam velit ligula, vestibulum et ullamcorper ac, egestas nec lectus. Aenean dui lacus, blandit quis pellentesque vitae, hendrerit eget justo.
           `,
        images: [
          {
            alt: 'example',
            url: 'julie.jpg',
          },
          {
            alt: 'example',
            url: 'julie.jpg',
          },
          {
            alt: 'example',
            url: 'julie.jpg',
          },
          {
            alt: 'example',
            url: 'julie.jpg',
          },
        ],
      },
      {
        id: 2,
        price: 313,
        banner: 'landingbottom1.jpg',
        name: 'Bird2',
        booking: 'http://booking/ets/1',
        description: `
           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras hendrerit lacinia purus dictum bibendum. Proin sed sagittis dolor. Maecenas quis fermentum est. Vivamus cursus massa id est sollicitudin condimentum. Mauris at lobortis enim. Quisque a metus nec erat dapibus efficitur. Aenean mollis, neque in sagittis posuere, sapien dolor placerat magna, sit amet tincidunt est lacus id lacus. Aliquam a mi eget erat convallis elementum. Praesent eu diam nec augue elementum ultricies quis non elit.
        
        Aliquam rutrum turpis ac ex fermentum venenatis. Nam eget elit ligula. Suspendisse euismod facilisis arcu, vehicula rutrum elit pellentesque sed. Etiam tellus libero, lacinia nec tristique eu, aliquet ut mauris. Aliquam dapibus convallis bibendum. Nam elementum lacus nunc, et rhoncus enim cursus ac. Nam velit ligula, vestibulum et ullamcorper ac, egestas nec lectus. Aenean dui lacus, blandit quis pellentesque vitae, hendrerit eget justo.
           `,
        images: [
          {
            alt: 'example',
            url: 'julie.jpg',
          },
          {
            alt: 'example',
            url: 'julie.jpg',
          },
          {
            alt: 'example',
            url: 'julie.jpg',
          },
          {
            alt: 'example',
            url: 'julie.jpg',
          },
        ],
      },
    ],
  },
  {
    id: 4,
    address: '114B route de cremieu',
    name: 'Solidarité avec ',
    description:
      'Les sont natifs de la région. Ils servent de relais pour les actions caritatives',
    image: 'landingbottom4.jpg',
    city: 'Madrid',
    slug: 'solidarite',
    suits: [
      {
        id: 1,
        price: 123,
        banner: 'landingbottom1.jpg',
        name: 'Molo1',
        booking: 'http://booking/ets/1',
        description: `
           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras hendrerit lacinia purus dictum bibendum. Proin sed sagittis dolor. Maecenas quis fermentum est. Vivamus cursus massa id est sollicitudin condimentum. Mauris at lobortis enim. Quisque a metus nec erat dapibus efficitur. Aenean mollis, neque in sagittis posuere, sapien dolor placerat magna, sit amet tincidunt est lacus id lacus. Aliquam a mi eget erat convallis elementum. Praesent eu diam nec augue elementum ultricies quis non elit.
        
        Aliquam rutrum turpis ac ex fermentum venenatis. Nam eget elit ligula. Suspendisse euismod facilisis arcu, vehicula rutrum elit pellentesque sed. Etiam tellus libero, lacinia nec tristique eu, aliquet ut mauris. Aliquam dapibus convallis bibendum. Nam elementum lacus nunc, et rhoncus enim cursus ac. Nam velit ligula, vestibulum et ullamcorper ac, egestas nec lectus. Aenean dui lacus, blandit quis pellentesque vitae, hendrerit eget justo.
           `,
        images: [
          {
            alt: 'example',
            url: 'julie.jpg',
          },
          {
            alt: 'example',
            url: 'julie.jpg',
          },
          {
            alt: 'example',
            url: 'julie.jpg',
          },
          {
            alt: 'example',
            url: 'julie.jpg',
          },
        ],
      },
      {
        id: 2,
        price: 313,
        banner: 'landingbottom1.jpg',
        name: 'Molo2',
        booking: 'http://booking/ets/1',
        description: `
           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras hendrerit lacinia purus dictum bibendum. Proin sed sagittis dolor. Maecenas quis fermentum est. Vivamus cursus massa id est sollicitudin condimentum. Mauris at lobortis enim. Quisque a metus nec erat dapibus efficitur. Aenean mollis, neque in sagittis posuere, sapien dolor placerat magna, sit amet tincidunt est lacus id lacus. Aliquam a mi eget erat convallis elementum. Praesent eu diam nec augue elementum ultricies quis non elit.
        
        Aliquam rutrum turpis ac ex fermentum venenatis. Nam eget elit ligula. Suspendisse euismod facilisis arcu, vehicula rutrum elit pellentesque sed. Etiam tellus libero, lacinia nec tristique eu, aliquet ut mauris. Aliquam dapibus convallis bibendum. Nam elementum lacus nunc, et rhoncus enim cursus ac. Nam velit ligula, vestibulum et ullamcorper ac, egestas nec lectus. Aenean dui lacus, blandit quis pellentesque vitae, hendrerit eget justo.
           `,
        images: [
          {
            alt: 'example',
            url: 'julie.jpg',
          },
          {
            alt: 'example',
            url: 'julie.jpg',
          },
          {
            alt: 'example',
            url: 'julie.jpg',
          },
          {
            alt: 'example',
            url: 'julie.jpg',
          },
        ],
      },
    ],
  },
]

export default houses
