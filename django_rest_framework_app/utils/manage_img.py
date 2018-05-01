# import os
# from shutil import copyfile

# new_images = os.listdir(
#     "C:\\WORK\\hotel_app\\media\\test\\real_hotel_images")

# old_profile_folders = os.listdir(
#     "C:\\WORK\\hotel_app\\media\\test\\images")

# for x in range(0, len(old_profile_folders)):
#     dst = "C:\\WORK\\hotel_app\\media\\test\\images\\" + \
#         old_profile_folders[x] + "\\profile_picture.jpg"

#     if (x <= 90):
#         src = "C:\\WORK\\hotel_app\\media\\test\\real_hotel_images\\" + \
#             new_images[x]
#     elif (x > 90 and x <= 180):
#         src = "C:\\WORK\\hotel_app\\media\\test\\real_hotel_images\\" + \
#             new_images[x - 90]
#     elif (x > 180):
#         src = "C:\\WORK\\hotel_app\\media\\test\\real_hotel_images\\" + \
#             new_images[x - 180]

#     copyfile(src, dst)

# for img in old_profile_folders:
#     try:
#         os.remove("C:\\WORK\\hotel_app\\media\\test\\images\\" +
#                   img + "\\profile_picture.jpg")
#     except:
#         print(img)


import json
import os
from shutil import copyfile, copytree

# hotel_folders = os.listdir("C:\\WORK\\hotel_app\\media\\images\\hotels")

# fixtures_path = os.path.join(os.path.dirname(__file__), '..', '..')
# read_path = os.path.join(fixtures_path, 'hotelsdata.json')

# hotels_dst = "C:\\WORK\\hotel_app\\media\\images\\hotels\\"
# customers_dst = "C:\\WORK\\hotel_app\\media\\images\\customers\\"
# # src = "C:\\WORK\\hotel_app\\media\\images\\"

# with open(read_path, 'r') as r_f:
#     read_data = json.load(r_f)

#     for folder in hotel_folders:
#         for record in read_data:
#             if record['model'] == 'hotels.baseuser':
#                 # folder_id = int(folder.replace('user_', ''))
#                 if folder in record['fields']['img']:

#                     s = os.path.join(hotels_dst, folder)
#                     dest_folder = 'user_' + str(record['pk'])
#                     d = os.path.join(hotels_dst, dest_folder)
#                     copytree(s, d)

#                     record['fields']['img'] = '/images/hotels/' + \
#                         dest_folder + '/profile_picture.jpg'

# write_path = os.path.join(fixtures_path, 'hotelsdata_write.json')
# with open(write_path, 'w') as w_f:
#     json.dump(read_data, w_f, indent=4)

# images/customers/user_{0}/{1}
# "images/hotels/d77dad2a79eda76fde0612f51e23eb59/profile_picture.jpg"

# fixtures_path = os.path.join(os.path.dirname(__file__), '..', '..')
# read_path = os.path.join(fixtures_path, 'hotelsdata_read.json')
# with open(read_path, 'r') as r_f:
#     read_data = json.load(r_f)
#     for record in read_data:
#         if record['model'] == 'hotels.hotel':
#             hotel_img = record['fields']['img']
#             record['fields']['img'] = hotel_img.replace(
#                 'images/', 'images/hotels/')
#         if record['model'] == 'hotels.customer':
#             customer_img = record['fields']['img']
#             record['fields']['img'] = customer_img.replace(
#                 'images/', 'images/customers/')

# write_path = os.path.join(fixtures_path, 'hotelsdata_write.json')
# with open(write_path, 'w') as w_f:
#     json.dump(read_data, w_f, indent=4)


# fixtures_path = os.path.join(os.path.dirname(__file__), '..', '..')
# read_path = os.path.join(fixtures_path, 'hotelsdata_write.json')

# modif_path = os.path.join(fixtures_path, 'hotelsdata.json')

# with open(read_path, 'r') as r_f:
#     read_data = json.load(r_f)

#     with open(modif_path, 'r') as m_f:
#         mod_data = json.load(m_f)

#         for record in read_data:
#             if record['model'] == 'hotels.hotel' or record['model'] == 'hotels.customer':
#                 img = record['fields']['img']
#                 for rec in mod_data:
#                     if rec['model'] == "hotels.baseuser" and rec['pk'] == record['pk']:
#                         rec['fields']['img'] = img


write_path = os.path.join(fixtures_path, 'hotelsdata_write2.json')
with open(write_path, 'w') as w_f:
    json.dump(mod_data, w_f, indent=4)

    fixtures_path = os.path.join(os.path.dirname(__file__), 'fixtures')
    Group.objects.create(name='hotel')
    Group.objects.create(name='customer')

    customers_path = os.path.join(
        fixtures_path, 'customers_test_data.json')
    with open(customers_path, 'r') as f:
        data = json.load(f)
        for customer in data:
            Customer.objects.create(
                name=customer['fields']['name'],
                email=customer['fields']['email'],
                img=customer['fields']['img'],
                group_id=customer['fields']['group'],
                password=customer['fields']['password']
            )

    hotels_path = os.path.join(fixtures_path, 'hotels_test_data.json')
    with open(hotels_path, 'r') as f:
        data = json.load(f)
        for hotel in data:
            Hotel.objects.create(
                name=hotel['fields']['name'],
                email=hotel['fields']['email'],
                img=hotel['fields']['img'],
                group_id=hotel['fields']['group'],
                password=hotel['fields']['password'],

                location=hotel['fields'].get("location", None),
                rates=hotel['fields'].get("rates", None),
                phone=hotel['fields'].get("phone", None),
                availability=hotel['fields'].get("availability", None),
                website=hotel['fields'].get("website", None),
                avg_rating=hotel['fields'].get("avg_rating", None),
            )

    reviews_path = os.path.join(fixtures_path, 'reviews_test_data.json')
    with open(reviews_path, 'r') as f:
        data = json.load(f)
        for review in data:
            Review.objects.create(
                text=review['fields'].get("text", None),
            )

    stays_path = os.path.join(fixtures_path, 'stays_test_data.json')
    with open(stays_path, 'r') as f:
        data = json.load(f)
        for stay in data:
            review = stay['fields'].get("review", None)
            if (review):
                review = Review.objects.get(id=review)
            Stay.objects.create(
                start_date=stay['fields'].get("start_date", None),
                end_date=stay['fields'].get("end_date", None),
                customer=Customer.objects.get(
                    id=stay['fields'].get("customer", None)),
                hotel=Hotel.objects.get(
                    id=stay['fields'].get("hotel", None) + 187),
                review=review,
                rating=stay['fields'].get("rating", None),
            )
