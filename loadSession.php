<script type='text/javascript'> 
   // change this to load from the database. Just use sample code for now.
   var division = new Exercise({
      name: 'Barbell Benchpress',

      sets: new DivisionSuite({
         divisions: [
            new Set({
               targetData: [
                  new TargetString({message: 'Warmup'}),

                  new TargetRange({
                     name: 'reps',
                     low: 12,
                     high: 16
                  })
               ],
               lastData: [

               ],
            }),
            new Set({
               targetData: [
                  new TargetRange({
                     name: 'reps',
                     low: 10,
                     high: 12 
                  })
               ],
               lastData: [

               ],
            }),
            new Set({
               targetData: [
                  new TargetString({message: 'To failure'}),

                  new TargetRange({
                     name: 'reps',
                     low: 6,
                     high: 8
                  })
               ],
               lastData: [
                  new RecordField({
                     name: 'reps',
                     value: 9
                  }),
                  new RecordField({
                     name: 'weight',
                     value: 205
                  })

               ],
            })
         ],

         restDurations: [
            60,
            75
         ]
      }),

      inputFields: [
         new RecordInputField({
            name: 'weight',
            inputType: INPUT.BARBELL
         }),
         new RecordInputField({
            name: 'reps',
            inputType: INPUT.DIGIT
         }),
      ]

   });

   var sessionTemplate = new SessionTemplate({division: division});

   SessionManager.load(sessionTemplate);
</script>
