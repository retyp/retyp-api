'use strict'

/*
|--------------------------------------------------------------------------
| PasteSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const Paste = use('App/Models/Paste')

class PasteSeeder {
  async run () {
    await Paste.query().delete()

    await Paste.create({
      hash: 'test',
      name: 'Java Bubble Sorting algorithm',
      language: 'java',
      content: `public static void bubbleSort(int[] a) {
    boolean sorted = false;
    int temp;
    while(!sorted) {
        sorted = true;
        for (int i = 0; i < array.length - 1; i++) {
            if (a[i] > a[i+1]) {
                temp = a[i];
                a[i] = a[i+1];
                a[i+1] = temp;
                sorted = false;
            }
        }
    }
}`
    })

    await Factory
      .model('App/Models/Paste')
      .createMany(5)
  }
}

module.exports = PasteSeeder
