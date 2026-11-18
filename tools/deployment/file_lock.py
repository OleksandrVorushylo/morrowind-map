from __future__ import annotations

import errno
import os
import time
from typing import BinaryIO


def _acquire_windows_lock(stream: BinaryIO) -> None:
    import msvcrt

    while True:
        stream.seek(0)
        try:
            msvcrt.locking(stream.fileno(), msvcrt.LK_NBLCK, 1)
            return
        except OSError as error:
            if error.errno not in (errno.EACCES, errno.EAGAIN, errno.EDEADLK):
                raise
            time.sleep(0.1)


def acquire_file_lock(stream: BinaryIO) -> None:
    if os.name == 'nt':
        _acquire_windows_lock(stream)
    else:
        import fcntl

        fcntl.flock(stream.fileno(), fcntl.LOCK_EX)
