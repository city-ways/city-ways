<?php

namespace App\Security;

use App\Entity\Parkings;
use App\Entity\Users;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\Security;

class ParkingVoter extends Voter
{
    /*
     *
     */
    const VIEW = 'view';
    const EDIT = 'edit';

    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    protected function supports(string $attribute, $subject): bool
    {
        if (!in_array($attribute, [self::VIEW, self::EDIT])) {
            return false;
        }

        if (!$subject instanceof Parkings) {
            return false;
        }

        return true;
    }

    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token): bool
    {
        $user = $token->getUser();

        if (!$user instanceof Users) {
            return false;
        }
        // admin can edit all parkings
        if ($this->security->isGranted('ROLE_ADMIN')) {
            return true;
        }

        /** @var Parkings $parkings */
        $parkings = $subject;

        switch ($attribute) {
            case self::VIEW:
                return $this->canView($parkings, $user);
            case self::EDIT:
                return $this->canEdit($parkings, $user);
        }

        throw new \LogicException('What are you doing??');
    }

    private function canView(Parkings $parkings, Users $user): bool
    {
        if ($this->canEdit($parkings, $user)) {
            return true;
        }

        return false;
    }

    private function canEdit(Parkings $parkings, Users $user): bool
    {
        return $user == $parkings->getOwner()[0];
    }
}