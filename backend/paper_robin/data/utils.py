from datetime import datetime, timezone
import pytz

def time_string_to_utc_epoch(ts, tz):
    ''' Expecting "2020-02-13 11:16:00" format '''
    dt_obj = datetime.strptime(ts, '%Y-%m-%d %H:%M:%S')
    return dt_obj.replace(tzinfo=pytz.timezone(tz)).astimezone(timezone.utc).timestamp()
