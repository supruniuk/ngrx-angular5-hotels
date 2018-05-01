import json
import os
from shutil import copyfile, copytree

with open('C:\\WORK\\ngrx-hotels-Angular5\\django_rest_framework_app\\hotelsdata.json', 'r') as f:
    data = json.load(f)
    for stay in data:
        if stay['model'] == "hotels.stay" and stay['fields']['review'] != None:
            for review in data:
              if review['model'] == "hotels.review" and review['pk'] == stay['fields']['review']:
                review['fields']['stay'] = stay['pk']
                review['fields']['hotel'] = stay['fields']['hotel']
                review['fields']['customer'] = stay['fields']['customer']
                review['fields']['rating'] = stay['fields']['rating']
                review['fields']['created_on'] = stay['fields']['end_date']
                del stay['fields']['review']
                del stay['fields']['rating']
                print review
                break
with open('C:\\WORK\\ngrx-hotels-Angular5\\django_rest_framework_app\\hotelsdata2.json', 'w') as w_f:
    json.dump(data, w_f, indent=4)

      # {
      #   "model": "hotels.stay",
      #   "pk": 26,
      #   "fields": {
      #     "start_date": "2013-04-30",
      #     "end_date": "2013-05-09",
      #     "customer": 86,
      #     "hotel": 211,
      #     "review": 216,
      #     "rating": 4.0
      #   }
      # }

  #   {
  #   "model": "hotels.review",
  #   "pk": 362,
  #   "fields": {
  #     "text": "Augue proin amet scelerisque. Proin curae egestas mattis id purus ut arcu ultrices per libero. Porta morbi vivamus sit pulvinar aliquam habitant porta. Purus etiam sociis massa euismod duis erat fusce venenatis nullam mus integer cras commodo fames. Felis augue lectus sapien urna pede parturient hymenaeos ullamcorper tincidunt nunc est ac bibendum eleifend. Magna proin aenean sagittis imperdiet mauris mollis nec sit consectetuer in gravida ante nulla. Curae fames pulvinar vitae pellentesque lorem eu nulla tristique vulputate parturient eni. Velit etiam magnis sagittis adipiscing montes. Velit lorem lacus primis sollicitudin cubilia phasellus odio suspendisse. Ipsum porta. Fusce nulla potenti morbi. Justo morbi a diam ve molestie. Fusce augue velit conubia. Etiam neque. Purus lorem.",
  #     "likes": []
  #   }
  # }