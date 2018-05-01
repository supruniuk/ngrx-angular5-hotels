import six
from filters.schema import base_query_params_schema
from filters.validations import (
    IntegerLike
)

# make a validation schema for hotels filter query params
hotels_query_schema = base_query_params_schema.extend(
    {
        "id": IntegerLike(),
        "name": six.text_type,
        "rating": IntegerLike(),
        # "favorites": CSVofIntegers(),
    }
)
