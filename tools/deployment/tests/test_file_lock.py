import errno
import sys
import tempfile
import types
import unittest
from unittest import mock

from tools.deployment.file_lock import _acquire_windows_lock


class WindowsFileLockTests(unittest.TestCase):
    def test_retries_contention_and_locks_the_first_byte(self):
        locking = mock.Mock(side_effect=[OSError(errno.EACCES, 'locked'), None])
        msvcrt = types.SimpleNamespace(locking=locking, LK_NBLCK=2)
        with tempfile.TemporaryFile() as stream, mock.patch.dict(sys.modules, {'msvcrt': msvcrt}), \
                mock.patch('tools.deployment.file_lock.time.sleep') as sleep:
            stream.seek(4)
            _acquire_windows_lock(stream)
            self.assertEqual(stream.tell(), 0)
            self.assertEqual(locking.call_args_list, [mock.call(stream.fileno(), 2, 1)] * 2)
            sleep.assert_called_once_with(0.1)

    def test_does_not_retry_unexpected_errors(self):
        locking = mock.Mock(side_effect=OSError(errno.EBADF, 'bad descriptor'))
        msvcrt = types.SimpleNamespace(locking=locking, LK_NBLCK=2)
        with tempfile.TemporaryFile() as stream, mock.patch.dict(sys.modules, {'msvcrt': msvcrt}), \
                mock.patch('tools.deployment.file_lock.time.sleep') as sleep:
            with self.assertRaises(OSError):
                _acquire_windows_lock(stream)
            sleep.assert_not_called()
