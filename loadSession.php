<script type='text/javascript'> 
   // change this to load from the database. Just use sample code for now.
   var division = new Exercise({
      name: 'Barbell Benchpress',

      sets: new Sets({
         divisions: [
            new Set({
               fields: [
                  new RecordField({
                     name: 'Reps',
                     inputType: INPUT.DIGIT,
                     lastValue: 16,
                     target: [
                        new TargetString({message: 'Warmup'}),
                        new TargetRange({
                           name: 'reps',
                           low: 12,
                           high: 16
                        })
                     ]
                  }),
                  new RecordField({
                     name: 'Weight',
                     lastValue: 135,
                     inputType: INPUT.BARBELL,
                     system: SYSTEM.US
                  }),
                  new RecordField({
                     name: 'Duration',
                     lastValue: 26.2,
                     inputType: INPUT.DURATION
                  })
               ]
            }),

            new Set({
               fields: [
                  new RecordField({
                     name: 'Reps',
                     inputType: INPUT.DIGIT,
                     target: [
                        new TargetRange({
                           low: 10,
                           high: 12
                        })
                     ]
                  }),
                  new RecordField({
                     name: 'Weight',
                     inputType: INPUT.BARBELL,
                     system: SYSTEM.US
                  }),
                  new RecordField({
                     name: 'Duration',
                     inputType: INPUT.DURATION
                  })
               ]
            }),

            new Set({
               fields: [
                  new RecordField({
                     name: 'Reps',
                     lastValue: 9,
                     inputType: INPUT.DIGIT,
                     target: [
                        new TargetString({message: 'To Failure'}),
                        new TargetRange({
                           low: 6,
                           high: 8
                        })
                     ]
                  }),
                  new RecordField({
                     name: 'Weight',
                     lastValue: 205,
                     inputType: INPUT.BARBELL,
                     system: SYSTEM.US
                  }),
                  new RecordField({
                     name: 'Duration',
                     inputType: INPUT.DURATION
                  })
               ]
            })
         ],

         restDurations: [
            60,
            75
         ]
      }),
   });

   var sessionTemplate = new SessionTemplate({division: division});

   SessionManager.load(sessionTemplate);
</script>
