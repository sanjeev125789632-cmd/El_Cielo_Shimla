import urllib.request
import re

ids = [
    'photo-1596394516093-501ba68a0ba6',
    'photo-1571896349842-33c89424de2d',
    'photo-1584132967334-10e028bd69f7',
    'photo-1502784444187-359ac186c5bb',
    'photo-1510312305653-8ed496efae75',
    'photo-1520250497591-112f2f40a3f4'
]

for pid in ids:
    try:
        url = 'https://images.unsplash.com/' + pid + '?auto=format&fit=crop&w=800&q=80'
        req = urllib.request.Request('https://unsplash.com/photos/' + pid.replace('photo-', ''), headers={'User-Agent': 'Mozilla/5.0'})
        html = urllib.request.urlopen(req, timeout=5).read().decode('utf-8', errors='ignore')
        title = re.search(r'<title>(.*?)</title>', html)
        print(pid)
        if title:
            print('  Title:', title.group(1))
    except Exception as e:
        print(pid, 'err:', e)
